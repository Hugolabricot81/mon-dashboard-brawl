import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Replace 'repo-name' with your GitHub repository name
  // e.g. base: '/brawl-stars-dashboard/'
  base: '/mon-dashboard-brawl/',
})
