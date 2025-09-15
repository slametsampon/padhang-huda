// packages/quran-viewer/vite.config.ts

import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'QuranViewer',
      fileName: () => 'quran-viewer.js', // 👈 hasil build bernama quran-viewer.js
      formats: ['es'],
    },
    outDir: '../../public/plugins',
    emptyOutDir: false,
  },
});
