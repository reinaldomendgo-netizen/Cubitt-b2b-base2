
import { Product, ProductVariant } from '../types';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { supabase, isSupabaseConfigured } from './supabaseClient';

// Definición laxa para permitir normalización dinámica de columnas
interface DataRow {
  [key: string]: any;
}

// Helper para limpiar HTML
const stripHtml = (html: string): string => {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '').trim();
};

const processRawRows = (rows: DataRow[], priceKey?: string, filterZeroInventory: boolean = false): Product[] => {
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
    const inventoryStr = getValue(row, ['Variant Inventory Qty', 'Inventory', 'Stock', 'Qty', 'Cantidad', 'Existencia', 'Inventario']);
    const inventory = parseInt(inventoryStr, 10) || 0;

    // FILTRO: Si se requiere filtrar inventario cero y el inventario es <= 0, saltar esta variante.
    if (filterZeroInventory && inventory <= 0) {
      return;
    }

    // Prioridad de Imagen: Variant Image (Específica) > Image Src (Estándar) > Image (Genérica)
    const variantImage = getValue(row, ['Variant Image', 'Imagen Variante']);
    const mainImage = getValue(row, ['Image Src', 'Image', 'Imagen', 'Photo']);
    
    // Prioridad de Precio: priceKey (si existe) > Price > Variant Price > Precio
    const priceKeys = [priceKey, 'Variant Price', 'Price', 'Precio', 'Costo', 'Valor', 'MSRP'].filter(Boolean) as string[];
    const priceStr = getValue(row, priceKeys);
    const price = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
    
    const comparePriceStr = getValue(row, ['Compare At Price', 'Compare Price', 'Precio Comparacion']);
    const comparePrice = comparePriceStr ? parseFloat(comparePriceStr.replace(/[^0-9.]/g, '')) : undefined;
    
    let color = getValue(row, ['Option1 Value', 'Color', 'Colour', 'Option1', 'Variante']);
    // Filtro para eliminar "Default" o "Default Title" (común en exports de Shopify)
    if (!color || color.toLowerCase() === 'default' || color.toLowerCase() === 'default title') {
      color = 'Único';
    }

    // Generar SKU por defecto si no existe
    const defaultSku = `${handle}-${color.replace(/\s+/g, '')}`; 
    const sku = getValue(row, ['Variant SKU', 'SKU', 'Part Number']) || defaultSku;

    const title = getValue(row, ['Title', 'Product Name', 'Nombre']);
    const type = getValue(row, ['Type', 'Product Type', 'Category', 'Categoria']) || 'General';
    const descriptionHtml = getValue(row, ['Body (HTML)', 'Description', 'Descripción']) || '';
    const description = stripHtml(descriptionHtml);
    const tags = getValue(row, ['Tags', 'Etiquetas']);
    const vendor = getValue(row, ['Vendor', 'Marca']) || 'Cubitt';

    // 3. Crear o Actualizar Producto Padre
    if (!productMap[handle]) {
      productMap[handle] = {
        id: handle,
        handle: handle,
        title: title || handle, // Placeholder si el título está vacío en la primera fila (raro)
        description: description,
        vendor: vendor,
        category: type,
        type: type,
        mainImage: mainImage || variantImage, // Preferir Image Src para el padre, fallback a Variant Image
        tags: tags ? tags.split(',').map(t => t.trim()) : [],
        variants: [],
        isOutOfStock: false,
        isBestSeller: tags.toLowerCase().includes('best seller'),
        isSale: tags.toLowerCase().includes('sale') || !!comparePrice,
      };
    } else {
      // Si ya existe, intentamos rellenar datos faltantes (ej. si la primera fila no tenía título)
      const p = productMap[handle];
      if ((!p.title || p.title === handle) && title) p.title = title;
      if (!p.description && description) p.description = description;
      if ((!p.category || p.category === 'General') && type) {
        p.category = type;
        p.type = type;
      }
      if (!p.mainImage && mainImage) p.mainImage = mainImage;
    }

    // 4. Gestionar Variantes
    const product = productMap[handle];
    const existingVariant = product.variants.find(v => v.sku === sku);

    // Determinar imagen de la variante: Variant Image > Main Image
    const finalVariantImage = variantImage || product.mainImage;

    if (!existingVariant) {
      // Nueva variante
      product.variants.push({
        sku: sku,
        option1: color,
        price: price,
        compareAtPrice: comparePrice,
        inventory: inventory,
        image: finalVariantImage
      });
    } else {
      // Variante existente: Actualizar imagen si la fila actual tiene una mejor (ej. Variant Image específica)
      if ((!existingVariant.image || existingVariant.image === product.mainImage) && variantImage) {
        existingVariant.image = variantImage;
      }
    }
  });

  // 5. Post-procesamiento y Limpieza
  return Object.values(productMap)
    .filter(product => product.variants.length > 0) // Filtrar productos sin variantes (por ejemplo, si todas tenían stock 0)
    .map(product => {
    // Limpieza de Título: "AURA 2" es mejor que "aura-2"
    if (product.title === product.handle) {
       product.title = product.handle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }

    // Lógica para seleccionar una imagen "variada" (no siempre la negra/primera)
    // Preferir imágenes de variantes que no sean colores neutros si es posible
    const variantsWithImages = product.variants.filter(v => v.image);
    
    if (variantsWithImages.length > 0) {
      // Intentar encontrar una variante que no sea negra/blanca/gris
      const colorfulVariant = variantsWithImages.find(v => {
        const color = v.option1.toLowerCase();
        return !['black', 'negro', 'white', 'blanco', 'grey', 'gray', 'gris', 'plata', 'silver', 'obsidian'].some(c => color.includes(c));
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

const mockProducts: Product[] = [
  {
    id: 'aura-2',
    handle: 'aura-2',
    title: 'AURA 2',
    description: 'El AURA 2 es el smartwatch que se adapta a tu día a día con un diseño ligero, pantalla AMOLED de 1.43” y todas las funciones esenciales de salud.',
    vendor: 'Cubitt',
    category: 'Watches',
    type: 'Watches',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-AURA2-1_Black.webp?v=1758827355',
    tags: ['Best Seller'],
    isBestSeller: true,
    isSale: false,
    isOutOfStock: false,
    variants: [
      {
        sku: 'CT-AURA2-1',
        option1: 'Obsidian Black',
        price: 84.99,
        inventory: 738,
        image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-AURA2-1_Black.webp?v=1758827355'
      },
      {
        sku: 'CT-AURA2-2',
        option1: 'Deepest Blue',
        price: 84.99,
        inventory: 297,
        image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-AURA2-2.webp?v=1763491859'
      }
    ]
  },
  {
    id: 'aura-pro-2',
    handle: 'aura-pro-2',
    title: 'AURA Pro 2',
    description: 'El AURA Pro 2 está hecho para todo, desde entrenamientos diarios hasta aventuras al aire libre.',
    vendor: 'Cubitt',
    category: 'Watches',
    type: 'Watches',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-AURAP2-1_Black.webp?v=1758813592',
    tags: ['New Arrival'],
    isBestSeller: false,
    isSale: false,
    isOutOfStock: false,
    variants: [
      {
        sku: 'CT-AURAP2-1',
        option1: 'Obsidian Black',
        price: 119.99,
        inventory: 610,
        image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-AURAP2-1_Black.webp?v=1758813592'
      },
      {
        sku: 'CT-AURAP2-8',
        option1: 'Wolf Gray',
        price: 119.99,
        inventory: 503,
        image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-AURAP2-8.webp?v=1763501131'
      }
    ]
  },
  {
    id: 'power-go-gen2',
    handle: 'power-go-gen2',
    title: 'Power Go Gen2',
    description: 'Pequeña por fuera, poderosa por dentro. La Cubitt Power Go ofrece gran sonido en un tamaño compacto.',
    vendor: 'Cubitt',
    category: 'Audio',
    type: 'Speakers',
    mainImage: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-PWGO2-1.webp?v=1754344016',
    tags: [],
    isBestSeller: false,
    isSale: false,
    isOutOfStock: false,
    variants: [
      {
        sku: 'CT-PWGO2-1',
        option1: 'Obsidian Black',
        price: 44.99,
        inventory: 146,
        image: 'https://cdn.shopify.com/s/files/1/0264/7562/6543/files/CT-PWGO2-1.webp?v=1754344016'
      }
    ]
  }
];

export const fetchProductsFromSupabase = async (companyName: string): Promise<Product[]> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase no está configurado.');
    return [];
  }

  try {
    // 1. Consultar tabla 'clientes' para obtener el tipo de precio
    let priceKey: string | undefined;
    
    // Normalizar nombre de empresa para búsqueda (opcional, depende de cómo estén los datos)
    // Asumimos búsqueda exacta o insensible a mayúsculas según la DB
    const { data: clientData, error: clientError } = await supabase
      .from('clientes')
      .select('tipo_precio')
      .ilike('empresa', companyName) // ilike para case-insensitive matching
      .maybeSingle();

    if (clientError) {
      console.error('Error fetching client:', clientError);
    }

    if (clientData && clientData.tipo_precio) {
      priceKey = clientData.tipo_precio;
      console.log(`Cliente encontrado: ${companyName}, Tipo de Precio: ${priceKey}`);
    } else {
      console.log(`Cliente no encontrado o sin tipo de precio: ${companyName}. Usando precio base.`);
    }

    // 2. Consultar tabla 'productos' (o 'products')
    // Cargar TODAS las filas, sin límites.
    let { data, error } = await supabase
      .from('productos')
      .select('*')
      .range(0, 9999);

    // Fallback a tabla 'products' si 'productos' falla o está vacía
    if (error || !data || data.length === 0) {
       console.warn('Tabla "productos" vacía o error. Intentando "products"...');
       const result2 = await supabase
        .from('products')
        .select('*')
        .range(0, 9999);
       
       if (result2.data && result2.data.length > 0) {
         data = result2.data;
         error = result2.error;
       }
    }

    if (error) {
      console.error('Error fetching products from Supabase:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.warn('No se encontraron productos en Supabase.');
      return [];
    }

    // 3. Procesar filas
    // Pasamos true para filtrar inventario > 0 estrictamente
    const products = processRawRows(data as DataRow[], priceKey, true);

    return products;
  } catch (error) {
    console.error("Error general en fetchProductsFromSupabase:", error);
    return [];
  }
};
