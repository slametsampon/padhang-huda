// packages/quran-viewer/src/index.ts

import { QuranViewer } from './quran-viewer';
import type { HostContext } from '../../../src/host-context';

/**
 * 👉 Default export harus berupa constructor class,
 * agar host bisa mendaftarkan custom element dengan tag dari plugins.json
 */
export default QuranViewer;

/**
 * Opsional init untuk integrasi non-routing
 * (misalnya eventBus, theme, provider injection, dll.)
 */
export function init(ctx: HostContext) {
  console.log('📖 QuranViewer init dengan host version:', ctx.version);

  if (ctx.provider) {
    // Jika sudah ada <quran-view> di halaman, injeksi provider global
    const el = document.querySelector('quran-view') as QuranViewer | null;
    if (el) {
      el.setProvider(ctx.provider);
    }
  }
}
