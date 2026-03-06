
import { Product, ProductVariant } from '../types';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { supabase, isSupabaseConfigured } from './supabaseClient';

// Definición laxa para permitir normalización dinámica de columnas
interface DataRow {
  [key: string]: any;
}

const processRawRows = (rows: DataRow[], priceKey?: string): Product[] => {
  const productMap: Record<string, Product> = {};

  // Helper: Encuentra el valor de una columna buscando por varias posibles claves (insensible a mayúsculas/símbolos)
  const getValue = (row: DataRow, possibleKeys: string[]): string => {
    const rowKeys = Object.keys(row);
    
    for (const key of possibleKeys) {
      if (!key) continue;
      // 1. Intento exacto
      if (row[key] !== undefined && row[key] !== null && String(row[key]).trim() !== '') {
        return String(row[key]).trim();
      }
      
      // 2. Intento normalizado (sin espacios, sin guiones, minúsculas)
      const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '');
      const foundRowKey = rowKeys.find(k => k.toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedKey);
      
      if (foundRowKey && row[foundRowKey] !== undefined && row[foundRowKey] !== null && String(row[foundRowKey]).trim() !== '') {
        return String(row[foundRowKey]).trim();
      }
    }
    return '';
  };

  rows.forEach((row) => {
    // 1. Identificar Producto (Handle)
    const handle = getValue(row, ['Handle', 'ID', 'Product Handle']);
    if (!handle) return; // Fila inválida si no tiene handle

    // 2. Extraer Datos con Prioridad
    // Prioridad de Imagen: Variant Image (Específica) > Image Src (Estándar) > Image (Genérica)
    const image = getValue(row, ['Variant Image', 'Image Src', 'Image', 'Imagen', 'Photo']);
    
    // Prioridad de Precio: priceKey (si existe) > Price > Variant Price > Precio
    const priceKeys = [priceKey, 'Price', 'Variant Price', 'Precio'].filter(Boolean) as string[];
    const priceStr = getValue(row, priceKeys);
    const price = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
    
    const comparePriceStr = getValue(row, ['Compare At Price', 'Compare Price']);
    const comparePrice = comparePriceStr ? parseFloat(comparePriceStr.replace(/[^0-9.]/g, '')) : undefined;
    
    const inventoryStr = getValue(row, ['Inventory', 'Variant Inventory Qty', 'Stock', 'Qty']);
    const inventory = parseInt(inventoryStr, 10) || 0;

    let color = getValue(row, ['Option1 Value', 'Color', 'Colour', 'Option1', 'Variante']);
    // Filtro para eliminar "Default" o "Default Title" (común en exports de Shopify)
    if (!color || color.toLowerCase() === 'default' || color.toLowerCase() === 'default title') {
      color = 'Único';
    }

    // Generar SKU por defecto si no existe
    const defaultSku = `${handle}-${color.replace(/\s+/g, '')}`; 
    const sku = getValue(row, ['SKU', 'Variant SKU', 'Part Number']) || defaultSku;

    const title = getValue(row, ['Title', 'Product Name', 'Nombre']) || handle;
    const type = getValue(row, ['Type', 'Product Type', 'Category', 'Categoria']) || 'General';
    const description = getValue(row, ['Body (HTML)', 'Description', 'Descripción']) || '';
    const tags = getValue(row, ['Tags', 'Etiquetas']);
    const vendor = getValue(row, ['Vendor', 'Marca']) || 'Cubitt';

    // 3. Crear o Actualizar Producto Padre
    if (!productMap[handle]) {
      productMap[handle] = {
        id: handle,
        handle: handle,
        title: title.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '), // Formato Título
        description: description,
        vendor: vendor,
        category: type,
        type: type,
        mainImage: image, // Se intentará llenar con la primera imagen encontrada
        tags: tags ? tags.split(',').map(t => t.trim()) : [],
        variants: [],
        isOutOfStock: false,
        isBestSeller: tags.toLowerCase().includes('best seller'),
        isSale: tags.toLowerCase().includes('sale') || !!comparePrice,
      };
    }

    // 4. Gestionar Variantes
    const product = productMap[handle];
    const existingVariant = product.variants.find(v => v.sku === sku);

    if (!existingVariant) {
      // Nueva variante
      product.variants.push({
        sku: sku,
        option1: color,
        price: price,
        compareAtPrice: comparePrice,
        inventory: inventory,
        image: image || product.mainImage // Si la variante no tiene imagen propia, usa la del padre (temporalmente)
      });
    } else {
      // Variante existente: Actualizar imagen si la fila actual tiene una mejor (ej. Variant Image específica)
      if (!existingVariant.image && image) {
        existingVariant.image = image;
      }
    }
  });

  // 5. Post-procesamiento y Limpieza
  return Object.values(productMap).map(product => {
    // Lógica para seleccionar una imagen "variada" (no siempre la negra/primera)
    // Preferir imágenes de variantes que no sean colores neutros si es posible
    const variantsWithImages = product.variants.filter(v => v.image);
    
    if (variantsWithImages.length > 0) {
      // Intentar encontrar una variante que no sea negra/blanca/gris
      const colorfulVariant = variantsWithImages.find(v => {
        const color = v.option1.toLowerCase();
        return !['black', 'negro', 'white', 'blanco', 'grey', 'gray', 'gris', 'plata', 'silver'].some(c => color.includes(c));
      });

      // Si encontramos una colorida, la usamos como principal. Si no, usamos la primera disponible.
      // Esto sobreescribe la imagen del padre si se encontró una mejor opción.
      if (colorfulVariant) {
        product.mainImage = colorfulVariant.image;
      } else if (!product.mainImage) {
        product.mainImage = variantsWithImages[0].image;
      }
    }
    
    // Asegurar que todas las variantes tengan al menos la imagen del padre si les falta la suya
    product.variants.forEach(v => {
      if (!v.image) v.image = product.mainImage;
    });

    const totalStock = product.variants.reduce((acc, v) => acc + v.inventory, 0);
    
    return {
      ...product,
      isOutOfStock: totalStock <= 0,
      restockingSoon: totalStock <= 10 && totalStock > 0
    };
  });
};

export const parseCSVToProducts = (csvText: string): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          resolve(processRawRows(results.data as DataRow[]));
        } catch (e) {
          reject(e);
        }
      },
      error: (error: any) => reject(error)
    });
  });
};

export const parseExcelToProducts = (arrayBuffer: ArrayBuffer): Product[] => {
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];
  // SheetJS extrae valores de celda. Las imágenes deben venir como URLs en columnas como 'Image Src' o 'Variant Image'.
  const rows = XLSX.utils.sheet_to_json(worksheet);
  return processRawRows(rows as DataRow[]);
};

export const fetchProductsFromUrl = async (url: string): Promise<Product[]> => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error al descargar el archivo');
    const text = await response.text();
    return parseCSVToProducts(text);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// ... (existing imports)

const mockProducts: Product[] = [
  {
    id: 'mock-1',
    handle: 'smart-watch-pro',
    title: 'Smart Watch Pro Series 5',
    description: 'Advanced fitness tracking and health monitoring.',
    vendor: 'Cubitt',
    category: 'Watches',
    type: 'Watches',
    mainImage: 'https://picsum.photos/seed/watch/400/400',
    tags: ['Best Seller'],
    isBestSeller: true,
    isSale: false,
    isOutOfStock: false,
    variants: [
      {
        sku: 'SW-PRO-BLK',
        option1: 'Black',
        price: 89.99,
        inventory: 50,
        image: 'https://picsum.photos/seed/watch-black/400/400'
      },
      {
        sku: 'SW-PRO-SLV',
        option1: 'Silver',
        price: 89.99,
        inventory: 30,
        image: 'https://picsum.photos/seed/watch-silver/400/400'
      }
    ]
  },
  {
    id: 'mock-2',
    handle: 'wireless-earbuds',
    title: 'True Wireless Earbuds',
    description: 'Crystal clear sound with active noise cancellation.',
    vendor: 'Cubitt',
    category: 'Audio',
    type: 'Audio',
    mainImage: 'https://picsum.photos/seed/earbuds/400/400',
    tags: ['New Arrival'],
    isBestSeller: false,
    isSale: true,
    isOutOfStock: false,
    variants: [
      {
        sku: 'TWS-WHT',
        option1: 'White',
        price: 49.99,
        compareAtPrice: 69.99,
        inventory: 100,
        image: 'https://picsum.photos/seed/earbuds-white/400/400'
      }
    ]
  },
  {
    id: 'mock-3',
    handle: 'fitness-tracker',
    title: 'Fitness Tracker Band',
    description: 'Lightweight band for daily activity tracking.',
    vendor: 'Cubitt',
    category: 'Fitness',
    type: 'Fitness',
    mainImage: 'https://picsum.photos/seed/tracker/400/400',
    tags: [],
    isBestSeller: false,
    isSale: false,
    isOutOfStock: true,
    variants: [
      {
        sku: 'FT-PNK',
        option1: 'Pink',
        price: 29.99,
        inventory: 0,
        image: 'https://picsum.photos/seed/tracker-pink/400/400'
      }
    ]
  }
];

export const fetchProductsFromSupabase = async (companyName: string): Promise<Product[]> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase no está configurado. Usando datos de prueba (mock data).');
    // Return mock data after a short delay to simulate network request
    return new Promise(resolve => setTimeout(() => resolve(mockProducts), 800));
  }

  try {
// ... (rest of the function)
    const { data, error } = await supabase
      .from('productos')
      .select('*');

    if (error) throw error;
    if (!data || data.length === 0) return [];

    // Determinar la columna de precio basada en el nombre de la empresa
    let priceKey: string | undefined;
    const normalizedCompany = companyName.toUpperCase().trim();

    if (normalizedCompany === 'T20') priceKey = 'T20';
    else if (normalizedCompany === 'PAA') priceKey = 'PAA';
    else if (normalizedCompany === 'PAB') priceKey = 'PAB';
    else if (normalizedCompany === 'PAC') priceKey = 'PAC';
    else if (normalizedCompany === 'PAD') priceKey = 'PAD';

    return processRawRows(data as DataRow[], priceKey);
  } catch (error) {
    console.error("Error fetching products from Supabase:", error);
    throw error;
  }
};
