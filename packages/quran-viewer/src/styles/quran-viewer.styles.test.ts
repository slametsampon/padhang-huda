// packages/quran-viewer/src/styles/quran-viewer.styles.test.ts

import { fixture, html } from '@open-wc/testing';
import { QuranViewer } from '../quran-viewer';
import { it, expect } from 'vitest';

// Stub only if not already defined
if (!customElements.get('quran-surah-selector')) {
  customElements.define('quran-surah-selector', class extends HTMLElement {});
}
if (!customElements.get('quran-goto')) {
  customElements.define('quran-goto', class extends HTMLElement {});
}
if (!customElements.get('quran-search-box')) {
  customElements.define('quran-search-box', class extends HTMLElement {});
}
if (!customElements.get('quran-search-results')) {
  customElements.define('quran-search-results', class extends HTMLElement {});
}

it('applies Amiri font-family style rule for ayah', async () => {
  await fixture<QuranViewer>(html`<quran-viewer></quran-viewer>`);

  // ambil stylesheet textContent
  const cssText = (QuranViewer.styles as any).toString();

  expect(cssText).toContain("font-family: 'Amiri'");
});
