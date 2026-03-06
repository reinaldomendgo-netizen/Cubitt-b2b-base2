
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
    
    // Normalizamos el nombre de la empresa para la búsqueda
    // Usamos ilike para búsqueda insensible a mayúsculas/minúsculas
    const { data: clientData, error: clientError } = await supabase
      .from('clientes')
      .select('Tipo_precio')
      .ilike('Empresa', companyName)
      .maybeSingle();

    if (clientError) {
      console.error('Error fetching client:', clientError);
    }

    if (clientData && clientData.Tipo_precio) {
      priceKey = clientData.Tipo_precio;
      console.log(`Cliente encontrado: ${companyName}, Tipo de Precio: ${priceKey}`);
    } else {
      console.log(`Cliente no encontrado o sin tipo de precio: ${companyName}. Usando precio base.`);
    }

    // 2. Consultar tabla 'productos'
    console.log(`Cargando productos desde tabla: "productos"...`);
    
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .range(0, 10000); // Rango amplio como solicitado

    if (error) {
      console.error('Error al cargar productos:', error);
      return [];
    }

    if (!data || data.length === 0) {
      console.warn('La tabla "productos" está vacía o no se encontraron datos.');
      return [];
    }

    console.log(`Éxito: ${data.length} filas cargadas desde "productos".`);

    // 3. Procesar filas agrupando por Handle
    const products = processRowsGroupedByHandle(data as DataRow[], priceKey);
    console.log(`Procesados ${products.length} productos agrupados.`);

    return products;
  } catch (error) {
    console.error("Error general en fetchProductsFromSupabase:", error);
    return [];
  }
};

const processRowsGroupedByHandle = (rows: DataRow[], priceKey?: string): Product[] => {
  // Helper para obtener valores de forma insensible a mayúsculas/minúsculas
  const getValue = (row: DataRow, key: string) => {
    if (row[key] !== undefined) return row[key];
    const foundKey = Object.keys(row).find(k => k.toLowerCase() === key.toLowerCase());
    return foundKey ? row[foundKey] : undefined;
  };

  // Helper para obtener el precio correcto
  const getPrice = (row: DataRow, typePrice?: string): number => {
    let priceVal: any;

    if (typePrice) {
      // Intentar obtener el precio específico (T20, PAA, etc.)
      // Buscamos la columna que coincida con el tipo de precio
      priceVal = getValue(row, typePrice);
    }

    // Si no se encontró precio específico o es inválido, usar Variant Price
    if (priceVal === undefined || priceVal === null || priceVal === '') {
      priceVal = getValue(row, 'Variant Price');
    }

    // Limpiar y parsear el precio
    const p = parseFloat(String(priceVal || '0').replace(/[^0-9.]/g, ''));
    return isNaN(p) ? 0 : p;
  };

  // Agrupar filas por Handle
  const grouped: { [handle: string]: DataRow[] } = {};
  
  rows.forEach(row => {
    // Filtrar por inventario > 0
    const inventoryVal = getValue(row, 'Variant Inventory Qty');
    const inventory = parseInt(String(inventoryVal || '0'), 10) || 0;

    if (inventory > 0) {
      const handle = getValue(row, 'Handle');
      if (handle) {
        if (!grouped[handle]) {
          grouped[handle] = [];
        }
        grouped[handle].push(row);
      }
    }
  });

  // Convertir grupos a objetos Product
  const products: Product[] = Object.keys(grouped).map(handle => {
    const groupRows = grouped[handle];
    const mainRow = groupRows[0]; // Usamos la primera fila para datos generales

    // Datos generales del producto
    const title = getValue(mainRow, 'Title') || 'Sin Título';
    const bodyHtml = getValue(mainRow, 'Body (HTML)') || '';
    const description = stripHtml(bodyHtml) || getValue(mainRow, 'Image Alt Text') || '';
    const vendor = getValue(mainRow, 'Vendor') || 'Cubitt';
    const type = getValue(mainRow, 'Type') || 'General';
    const tagsStr = getValue(mainRow, 'Tags') || '';
    const tags = typeof tagsStr === 'string' ? tagsStr.split(',').map(t => t.trim()) : [];

    // Construir variantes
    const variants: ProductVariant[] = groupRows.map(row => {
      const sku = getValue(row, 'Variant SKU') || `SKU-${Math.random().toString(36).substr(2, 9)}`;
      const option1 = getValue(row, 'Option1 Value') || 'Default';
      const price = getPrice(row, priceKey);
      
      const inventoryVal = getValue(row, 'Variant Inventory Qty');
      const inventory = parseInt(String(inventoryVal || '0'), 10) || 0;

      // Imagen: Prioridad Variant Image > Image Src
      const image = getValue(row, 'Variant Image') || getValue(row, 'Image Src') || '';

      return {
        sku,
        option1,
        price,
        inventory,
        image
      };
    });

    // Imagen principal del producto (usamos la de la primera variante o Image Src del mainRow)
    const mainImage = variants.length > 0 && variants[0].image 
      ? variants[0].image 
      : (getValue(mainRow, 'Image Src') || '');

    return {
      id: handle, // Usamos handle como ID del producto
      handle,
      title,
      description,
      vendor,
      category: type,
      type,
      mainImage,
      variants,
      tags,
      isBestSeller: false,
      isSale: false,
      isOutOfStock: false, // Ya filtramos por inventario > 0, así que si existe, tiene stock
      restockingSoon: false
    };
  });

  return products;
};
