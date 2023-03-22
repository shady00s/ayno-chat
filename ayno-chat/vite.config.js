import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
export default defineConfig({
  server:{
    host:'192.168.1.4',
    port:3000,
   
  },
  plugins: [react(),svgr()],
})
