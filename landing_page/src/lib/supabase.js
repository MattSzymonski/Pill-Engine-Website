import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// If the env vars are not set, export null so callers can no-op gracefully
// instead of throwing at module load time ("supabaseUrl is required").
export const supabase = url && key ? createClient(url, key) : null;
