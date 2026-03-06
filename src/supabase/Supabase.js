import { createClient } from "@supabase/supabase-js";

// Only initialize Supabase if you're using it for storage/realtime
// NOT for authentication (we use MongoDB for auth)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a dummy client if Supabase is not configured
// This prevents errors when Supabase env vars are missing
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false
      }
    })
  : {
      // Dummy client that does nothing
      auth: {
        signUp: () => Promise.reject(new Error('Supabase not configured. Use MongoDB auth instead.')),
        signInWithPassword: () => Promise.reject(new Error('Supabase not configured. Use MongoDB auth instead.')),
        signOut: () => Promise.resolve(),
        getSession: () => Promise.resolve({ data: { session: null } })
      },
      storage: {
        from: () => ({
          upload: () => Promise.reject(new Error('Supabase storage not configured')),
          remove: () => Promise.reject(new Error('Supabase storage not configured'))
        })
      }
    };
