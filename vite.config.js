import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      // Basic PWA Configuration
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      
      // PWA Assets
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'mask-icon.svg',
        'robots.txt',
        'assets/*.{png,jpg}'
      ],
      
      // Manifest Configuration
      manifest: {
        name: 'My Vite PWA',
        short_name: 'VitePWA',
        description: 'A Vite-powered Progressive Web App',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        screenshots: [
          {
            src: 'screenshot1.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Home Screen'
          }
        ]
      },
      
      // Workbox Configuration
      workbox: {
        globPatterns: [
          '**/*.{js,css,html,woff2}',
          'assets/**/*.{png,jpg,svg}'
        ],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
              }
            }
          },
          {
            urlPattern: /^https:\/\/api\.example\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60 // 24 Hours
              }
            }
          }
        ]
      },
      
      // Dev Options
      devOptions: {
        enabled: false, // Disable in development (enable for testing)
        type: 'module',
        navigateFallback: 'index.html'
      },
      
      // Additional Features
      strategies: 'injectManifest', // or 'generateSW'
      srcDir: 'src',
      filename: 'sw.js',
      minify: true,
      outDir: 'dist'
    })
  ],
  build: {
    sourcemap: true // Recommended for PWAs
  }
});