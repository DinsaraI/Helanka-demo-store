import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const supabaseUrl = env.VITE_SUPABASE_URL?.trim()
  const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY?.trim()

  if (mode === 'production' && (
    !supabaseUrl
    || !supabaseAnonKey
    || supabaseUrl.includes('placeholder.supabase.co')
    || supabaseUrl.includes('your-project.supabase.co')
    || supabaseAnonKey === 'your-supabase-anon-key'
    || supabaseAnonKey === 'missing-supabase-anon-key'
  )) {
    throw new Error('Production builds require valid VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY values.')
  }

  return {
    base: '/Webapp-template/',
    plugins: [react()],
  }
})
