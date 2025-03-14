import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
   server:{
    proxy: {
      '/api': {
        target: 'https://e-commerce-project-dw75.onrender.com',
        changeOrigin: true,
        secure: false,
      },
      },
   },
  plugins: [react()],
})
