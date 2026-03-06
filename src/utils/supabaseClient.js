import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize Supabase WITHOUT auth
// This is for storage and database queries only
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
});

// Create Supabase client with MongoDB JWT for RLS
export const createSupabaseClientWithJWT = () => {
  const jwtToken = localStorage.getItem('supabase_token');
  
  if (!jwtToken) {
    return supabase;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  });
};

// Upload file to Supabase Storage
export const uploadFile = async (bucket, path, file) => {
  try {
    const client = createSupabaseClientWithJWT();
    
    const { data, error } = await client.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    // Get public URL
    const { data: urlData } = client.storage
      .from(bucket)
      .getPublicUrl(path);

    return {
      success: true,
      path: data.path,
      url: urlData.publicUrl
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Delete file from Supabase Storage
export const deleteFile = async (bucket, path) => {
  try {
    const client = createSupabaseClientWithJWT();
    
    const { error } = await client.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Delete error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Query Supabase database with MongoDB user context
export const querySupabase = async (tableName, query) => {
  try {
    const client = createSupabaseClientWithJWT();
    
    const { data, error } = await client
      .from(tableName)
      .select(query);

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Query error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
