import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_SUPABASE_URL
    : process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseAnonKey =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("🚨 Supabase environment variables are missing!");
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);
