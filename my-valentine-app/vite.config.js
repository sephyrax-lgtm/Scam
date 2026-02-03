import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/Scam/'  // ← AJOUTE CETTE LIGNE (nom de ton repo)
})
