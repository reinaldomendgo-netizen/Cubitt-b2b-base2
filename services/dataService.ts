
import { Product, ProductVariant } from '../types';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { supabase, isSupabaseConfigured } from './supabaseClient';

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

const processRowsAsIndividualProducts = (rows: DataRow[], priceKey?: string): Product[] => {
  return rows.map((row) => {
    // 1. Identificadores
    const title = row['Title'] || 'Sin Título';
    const sku = row['Variant SKU'] || `SKU-${Math.random().toString(36).substr(2, 9)}`;
    const handle = sku; // Usamos SKU como handle único ya que cada variante es un producto

    // 2. Precios
    // Lógica: Si existe priceKey (ej: T20) y tiene valor, usarlo. Si no, usar Variant Price.
    let price = 0;
    if (priceKey && row[priceKey] !== undefined && row[priceKey] !== null && row[priceKey] !== '') {
      const p = parseFloat(String(row[priceKey]).replace(/[^0-9.]/g, ''));
      if (!isNaN(p)) price = p;
    }
    
    if (price === 0) {
      const p = parseFloat(String(row['Variant Price']).replace(/[^0-9.]/g, ''));
      if (!isNaN(p)) price = p;
    }

    // 3. Inventario
    const inventory = parseInt(String(row['Variant Inventory Qty']), 10) || 0;

    // 4. Imagen
    // Prioridad: Variant Image > Image Src
    const image = row['Variant Image'] || row['Image Src'] || '';

    // 5. Otros datos
    const barcode = row['Variant Barcode'] || '';
    const description = row['Image Alt Text'] || ''; // Usamos Alt Text como descripción breve si no hay otra

    // Crear variante única
    const variant: ProductVariant = {
      sku: sku,
      option1: 'Default', // Como es producto individual, la opción es default
      price: price,
      inventory: inventory,
      image: image
    };

    // Crear producto
    const product: Product = {
      id: sku,
      handle: handle,
      title: title,
      description: description,
      vendor: 'Cubitt', // Valor por defecto o extraer si hubiera columna
      category: 'General',
      type: 'General',
      mainImage: image,
      variants: [variant],
      tags: [],
      isBestSeller: false,
      isSale: false,
      isOutOfStock: inventory <= 0,
      restockingSoon: inventory <= 10 && inventory > 0
    };

    return product;
  });
};

export const parseCSVToProducts = (csvText: string): Promise<Product[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        // CSV support is deprecated/removed as per user request, but keeping function signature to avoid breaking imports
        // returning empty array or basic processing if needed for fallback
        resolve([]); 
      },
      error: (error: any) => reject(error)
    });
  });
};

export const parseExcelToProducts = (arrayBuffer: ArrayBuffer): Product[] => {
    // Excel support deprecated
    return [];
};

export const fetchProductsFromUrl = async (url: string): Promise<Product[]> => {
    // URL fetch deprecated
    return [];
};

export const fetchProductsFromSupabase = async (companyName: string): Promise<Product[]> => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase no está configurado.');
    return [];
  }

  try {
    // 1. Consultar tabla 'clientes' para obtener el tipo de precio
    let priceKey: string | undefined;
    
    const { data: clientData, error: clientError } = await supabase
      .from('clientes')
      .select('tipo_precio')
      .ilike('empresa', companyName)
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

    // 2. Consultar tabla 'productos'
    // Columnas requeridas: Title, Variant SKU, Variant Price, Variant Inventory Qty, Variant Image, Image Src, Image Alt Text, Variant Barcode, T20, PAA, PAB, PAC, PAD
    console.log(`Cargando productos desde tabla: "productos"...`);
    
    // Nota: Supabase permite seleccionar columnas con espacios usando comillas dobles
    const { data, error } = await supabase
      .from('productos')
      .select('"Title", "Variant SKU", "Variant Price", "Variant Inventory Qty", "Variant Image", "Image Src", "Image Alt Text", "Variant Barcode", "T20", "PAA", "PAB", "PAC", "PAD"')
      .range(0, 9999);

    if (error) {
      console.error('Error al cargar productos:', error);
      return [];
    }

    if (!data || data.length === 0) {
      console.warn('La tabla "productos" está vacía o no se encontraron datos.');
      return [];
    }

    console.log(`Éxito: ${data.length} filas cargadas desde "productos".`);

    // 3. Procesar filas como productos individuales
    const products = processRowsAsIndividualProducts(data as DataRow[], priceKey);
    console.log(`Procesados ${products.length} productos individuales.`);

    return products;
  } catch (error) {
    console.error("Error general en fetchProductsFromSupabase:", error);
    return [];
  }
};
