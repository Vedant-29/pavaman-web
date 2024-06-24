import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://efhhibhbclwpwsgowsus.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmaGhpYmhiY2x3cHdzZ293c3VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMDc0NTEsImV4cCI6MjAzNDc4MzQ1MX0.LbHa9t_Lkyfn96c-2UtIxpJHBK-NFA01GTMtK_kV0cg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);