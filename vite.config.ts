// vite.config.ts

/// <reference types="vitest" />
import { defineConfig } from 'vite';

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
  // ✅ Tambahkan block test untuk Vitest
  test: {
    environment: 'jsdom', // butuh DOM untuk test Web Components
    globals: true, // supaya describe/it/expect bisa langsung dipakai
    setupFiles: './vitest.setup.ts', // opsional, bisa dihapus kalau tidak perlu
  },
});
