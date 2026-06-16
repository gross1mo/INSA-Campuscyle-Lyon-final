// This file handles everything related to the database.
// It connects to Supabase and exports all the functions the pages need.
// Import it with: import { db, supabase } from '@/api/client'

import { createClient } from '@supabase/supabase-js'

// Connect to Supabase — credentials come from the .env file, never hardcoded
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export const db = {
  items: {

    // Get all listings from the database, newest first
    list: async () => {
      const { data } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)
      return data
    },

    // Save a new listing — attaches the logged-in user's email automatically
    create: async (item) => {
      const { data: { user } } = await supabase.auth.getUser()
      const { data } = await supabase
        .from('items')
        .insert({ ...item, created_by: user?.email })
        .select()
        .single()
      return data
    },

    // Delete a listing by its ID
    delete: async (id) => {
      await supabase.from('items').delete().eq('id', id)
    },

    // Upload an image to Supabase Storage and return its public URL
    // Timestamp prefix avoids filename conflicts
    uploadImage: async (file) => {
      const fileName = `${Date.now()}-${file.name}`
      await supabase.storage.from('images').upload(fileName, file)
      const { data } = supabase.storage.from('images').getPublicUrl(fileName)
      return { file_url: data.publicUrl }
    },
  },
}