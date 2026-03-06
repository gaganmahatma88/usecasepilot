import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Force no caching for server requests
const fetchOptions = {
  cache: 'no-store' as RequestCache,
}

// Public client — respects RLS
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: { fetch: (url, options) => fetch(url, { ...options, ...fetchOptions }) },
})

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Force no caching for server requests
const fetchOptions = {
  cache: 'no-store' as RequestCache,
}

// Public client — respects RLS
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: { fetch: (url, options) => fetch(url, { ...options, ...fetchOptions }) },
})