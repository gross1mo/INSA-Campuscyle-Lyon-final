import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export const db = {
  items: {
    list: async () => {
      const { data } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)
      return data
    },

    create: async (item) => {
      const { data: { user } } = await supabase.auth.getUser()
      const { data } = await supabase
        .from('items')
        .insert({ ...item, created_by: user?.email })
        .select()
        .single()
      return data
    },

    delete: async (id) => {
      await supabase.from('items').delete().eq('id', id)
    },

    uploadImage: async (file) => {
      const fileName = `${Date.now()}-${file.name}`
      await supabase.storage.from('images').upload(fileName, file)
      const { data } = supabase.storage.from('images').getPublicUrl(fileName)
      return { file_url: data.publicUrl }
    },
  },
}
