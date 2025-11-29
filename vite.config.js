import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',

      injectRegister: 'auto',

      manifest: {
        name: 'myanimeakuh',
        short_name: 'myanimeakuh',
        description: 'Anime List',
        theme_color: '#0A1828',
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,

        // SPA fallback agar /dashboard tetap jalan offline
        navigateFallback: '/index.html',
      },

      devOptions: {
        enabled: true,       // <---- aktifkan di DEV!
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    })
  ]
});
