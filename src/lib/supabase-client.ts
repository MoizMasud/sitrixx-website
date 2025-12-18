import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://lmvymcncmmxtgfhkosmc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_yeiYWuyhjZBBoSPcFRRKow__58efMlK';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Initialize global supabase client for React components
if (typeof window !== 'undefined') {
  (window as any).supabaseClient = supabase;
}

export const API_BASE = 'https://sitrixx-website-backend.vercel.app';

/**
 * Wrap fetch to always send the Supabase JWT.
 * If there is no logged-in user, redirect to login.
 */
export async function authFetch(path: string, options: RequestInit = {}) {
  const { data, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Error getting session', error);
    throw error;
  }

  const session = data.session;
  if (!session) {
    // Not logged in → bounce them to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
    throw new Error('Not authenticated');
  }

  const token = session.access_token;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  return fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });
}

// Expose globally for legacy code
if (typeof window !== 'undefined') {
  (window as any).authFetch = authFetch;
}
