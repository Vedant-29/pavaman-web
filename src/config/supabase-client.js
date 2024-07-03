import { createClient } from '@supabase/supabase-js';

console.log('Supabase URL:', import.meta.env.VITE_REACT_APP_SUPABASE_URL);
console.log('Supabase Anon Key:', import.meta.env.VITE_REACT_APP_SUPABASE_ANON);


const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);