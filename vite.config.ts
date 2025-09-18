// vite.config.ts

/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  plugins: [
    // ✅ Copy semua JSON dari quran-data/public ke /quran-data
    viteStaticCopy({
      targets: [
        {
          src: 'packages/quran-data/public/*',
          dest: 'quran-data',
        },
      ],
    }),
  ],
  // ✅ Vitest config
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
  },
});
