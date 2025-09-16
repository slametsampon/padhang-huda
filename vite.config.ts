// vite.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  server: {
    port: 5173,
  },
  build: {
    outDir: 'dist',
  },
  test: {
    globals: true,
    environment: 'jsdom', // ✅ simulasi DOM di Node
  },
});
