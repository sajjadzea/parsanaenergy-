import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import markdown from 'vite-plugin-md';

export default defineConfig({
  plugins: [react(), markdown()],
  base: '/parsanaenergy/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsInlineLimit: 0,
    manifest: true,
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
});
