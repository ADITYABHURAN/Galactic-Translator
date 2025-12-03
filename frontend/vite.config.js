import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/translate': 'http://localhost:3001',
      '/reverse': 'http://localhost:3001'
    }
  }
})
