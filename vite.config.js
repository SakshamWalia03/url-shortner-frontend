import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // silence legacy deprecation warnings from sass
        quietDeps: true,
      },
    },
  },
})
