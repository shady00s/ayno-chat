import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host:'192.168.69.246',
    port:3000,
   
  },
  plugins: [react()],
})
