import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'images/bg12.jpeg'],
      manifest: {
        name: 'Rahul & Diksha | Wedding Invitation',
        short_name: 'Wedding Invite',
        description: 'With joy in our hearts, we invite you to celebrate our wedding.',
        theme_color: '#8B1A1A',
        background_color: '#1a0a00',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        lang: 'en',
        icons: [
          {
            src: '/images/bg12.jpeg',
            sizes: '192x192',
            type: 'image/jpeg',
            purpose: 'any maskable'
          },
          {
            src: '/images/bg12.jpeg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any maskable'
          }
        ],
        screenshots: [
          {
            src: '/images/bg12.jpeg',
            sizes: '1280x720',
            type: 'image/jpeg',
            form_factor: 'wide',
            label: 'Rahul & Diksha Wedding Invitation'
          },
          {
            src: '/images/bg12.jpeg',
            sizes: '720x1280',
            type: 'image/jpeg',
            form_factor: 'narrow',
            label: 'Rahul & Diksha Wedding Invitation'
          }
        ],
        shortcuts: [
          {
            name: 'RSVP Now',
            short_name: 'RSVP',
            description: 'Confirm your attendance',
            url: '/#rsvp',
            icons: [{ src: '/images/bg12.jpeg', sizes: '96x96', type: 'image/jpeg' }]
          }
        ],
        categories: ['lifestyle', 'social']
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpeg,jpg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: /\/images\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
})
