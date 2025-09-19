// packages/quran-viewer/src/components/quran-search-results.test.ts

import { html } from 'lit';
import { it, expect, describe } from 'vitest';
import { fixture } from '@open-wc/testing';
import { QuranSearchResults } from './quran-search-results';
import type { QuranVerse } from '../../../quran-data/src/quran-contract';

const mockResults: QuranVerse[] = [
  {
    surah: 1,
    ayah: 1,
    text: { arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' },
    translations: {
      id: 'Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang',
      en: 'In the name of Allah, the Entirely Merciful, the Especially Merciful',
    },
    meta: { juz: 1, page: 1 },
  },
];

describe('<quran-search-results>', () => {
  it('renders results correctly (custom mode)', async () => {
    const el = await fixture<QuranSearchResults>(
      html`<quran-search-results></quran-search-results>`
    );
    el.results = mockResults;
    el.lastQuery = 'Allah';
    el.lang = 'id';

    // inject custom translation & highlight
    el.getTranslation = (v, lang) => v.translations?.[lang] ?? '';
    el.highlight = (t, q) => t.replace(new RegExp(q, 'gi'), `<mark>$&</mark>`);

    await el.updateComplete;

    const text = el.shadowRoot?.textContent ?? '';
    const htmlOut = el.shadowRoot?.innerHTML ?? '';
    console.log('=== CUSTOM mode text ===\n', text);
    console.log('=== CUSTOM mode HTML ===\n', htmlOut);

    expect(text).to.contain('Dengan nama');
    expect(htmlOut).to.contain('<mark>Allah</mark>');
  });

  it('renders results correctly (fallback mode)', async () => {
    const el = await fixture<QuranSearchResults>(
      html`<quran-search-results></quran-search-results>`
    );
    el.results = mockResults;
    el.lastQuery = 'Allah'; // fallback highlight should mark this
    el.lang = 'id';

    await el.updateComplete;

    const text = el.shadowRoot?.textContent ?? '';
    const htmlOut = el.shadowRoot?.innerHTML ?? '';
    console.log('=== FALLBACK mode text ===\n', text);
    console.log('=== FALLBACK mode HTML ===\n', htmlOut);

    expect(text).to.contain('Dengan nama');
    expect(htmlOut).to.contain('<span class="highlight">Allah</span>');
  });
});
