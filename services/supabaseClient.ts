import { createClient } from '@supabase/supabase-js';

// Permitir tanto variables con prefijo VITE_ como sin él (útil para Netlify/Vercel)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Faltan las variables de entorno de Supabase (SUPABASE_URL y SUPABASE_ANON_KEY). La aplicación no podrá cargar datos.');
}

// Usar placeholders temporales si faltan las variables para evitar que la app se quede en blanco (crash a nivel de módulo)
export const supabase = createClient(
  supabaseUrl || 'https://falta-configurar.supabase.co', 
  supabaseAnonKey || 'falta-configurar'
);
