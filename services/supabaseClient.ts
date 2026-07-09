import { createClient } from '@supabase/supabase-js';

// Fallbacks seguros para evitar crashes por 'process is not defined' en Vite
const getEnvVar = (viteKey: string, nodeKey: string, fallback: string) => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[viteKey]) {
    return import.meta.env[viteKey];
  }
  if (typeof process !== 'undefined' && process.env && process.env[nodeKey]) {
    return process.env[nodeKey];
  }
  return fallback;
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL', 'SUPABASE_URL', 'https://falta-configurar.supabase.co');
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY', 'SUPABASE_ANON_KEY', 'falta-configurar');

if (supabaseUrl === 'https://falta-configurar.supabase.co' || supabaseAnonKey === 'falta-configurar') {
  console.error('⚠️ Faltan las variables de entorno de Supabase (SUPABASE_URL y SUPABASE_ANON_KEY). La aplicación no podrá cargar datos.');
}

// Usar placeholders temporales si faltan las variables para evitar que la app se quede en blanco (crash a nivel de módulo)
export const supabase = createClient(
  supabaseUrl, 
  supabaseAnonKey
);
