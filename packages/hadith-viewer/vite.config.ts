// packages/hadith-viewer/vite.config.ts

import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'HadithViewer',
      fileName: () => 'hadith-viewer.js',
      formats: ['es'],
    },
    outDir: '../../public/plugins',
    emptyOutDir: false,
  },
});
