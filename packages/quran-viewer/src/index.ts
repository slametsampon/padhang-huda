// packages/quran-viewer/src/index.ts

import { QuranViewer } from './quran-viewer';
import type { HostContext } from '../../../src/host-context';

export default QuranViewer;

/**
 * Opsional init untuk integrasi non-routing
 * (eventBus, theme, provider injection, dsb.)
 */
export function init(ctx: HostContext) {
  console.log('📖 QuranViewer init dengan host version:', ctx.version);

  if (ctx.provider) {
    const el = document.querySelector('quran-viewer') as QuranViewer | null;
    if (el) {
      el.setProvider(ctx.provider);
    }
  }
}
