import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/** Usage:
 * 
 * import { supabase } from './supabaseClient'
 * 
 * const { data, error } = await supabase.from("your_table").select()
 * 
 */