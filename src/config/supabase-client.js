import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://REDACTED.supabase.co";
const supabaseAnonKey = "REDACTED_SUPABASE_ANON_KEY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);