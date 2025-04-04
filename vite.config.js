// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';  // Make sure to use the correct import for Vite plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcss() // Use tailwindcss plugin here
  ],
});
