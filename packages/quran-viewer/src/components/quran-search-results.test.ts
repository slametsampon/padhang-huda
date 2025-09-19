// packages/quran-viewer/src/components/quran-search-results.test.ts

import { fixture, html } from '@open-wc/testing';
import { it, expect } from 'vitest';
import { QuranSearchResults } from './quran-search-results';
import type { QuranVerse } from '../../../quran-data/src/quran-contract';

if (!customElements.get('quran-search-results')) {
  customElements.define('quran-search-results', QuranSearchResults);
}

const dummyVerse: QuranVerse = {
  surah: 1,
  ayah: 1,
  text: { arabic: 'بِسْمِ اللَّهِ' },
  translations: { id: 'Dengan nama Allah' },
};

it('renders results correctly', async () => {
  const el = await fixture<QuranSearchResults>(html`
    <quran-search-results
      .results=${[dummyVerse]}
      .lang=${'id'}
      .lastQuery=${'Allah'}
      .onGoto=${() => {}}
      .onCopy=${() => {}}
      .getTranslation=${(v: QuranVerse) => v.translations['id']}
      .highlight=${(t: string, q: string) => t.replace(q, `<b>${q}</b>`)}
    ></quran-search-results>
  `);

  expect(el.shadowRoot?.querySelector('.ayah')?.textContent).toContain(
    'بِسْمِ'
  );
  expect(el.shadowRoot?.querySelector('.translation')?.innerHTML).toContain(
    '<b>Allah</b>'
  );
});
