import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['7144-2001-f40-98e-bf6-984e-f313-6410-42ec.ngrok-free.app'],
  },
})
