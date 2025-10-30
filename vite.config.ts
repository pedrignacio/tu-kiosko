import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/tu-kiosko/', // ← Debe estar exactamente así
  server: {
    port: 3000
  },
  envPrefix: 'VITE_'
})