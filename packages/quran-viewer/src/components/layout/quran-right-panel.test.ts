// packages/quran-viewer/src/components/layout/quran-right-panel.test.ts

import { fixture, html } from '@open-wc/testing';
import { expect, describe, it } from 'vitest';
import './quran-right-panel';
import { QuranMockProvider } from '../../../../quran-data/src/quran-mock-provider';
import type { QuranRightPanel } from './quran-right-panel';

const flush = () => new Promise((r) => setTimeout(r, 0));

describe('<quran-right-panel>', () => {
  it('renders verse 1:1 with mock provider', async () => {
    const el = (await fixture(
      html`<quran-right-panel></quran-right-panel>`
    )) as QuranRightPanel;

    el.setProvider(new QuranMockProvider());
    el.surah = 1;
    el.ayah = 1;
    await el.loadVerse();
    await flush();
    await el.updateComplete;

    const text = el.shadowRoot?.textContent ?? '';
    expect(text).toContain('بِسْمِ اللَّهِ');
    expect(text).toContain('Dengan nama Allah');
  });

  it('navigates to next and prev ayah', async () => {
    const el = (await fixture(
      html`<quran-right-panel></quran-right-panel>`
    )) as QuranRightPanel;

    el.setProvider(new QuranMockProvider());
    el.surah = 1;
    el.ayah = 1;
    await el.loadVerse();
    await flush();

    // Klik Next
    const nextBtn = el.shadowRoot?.querySelector(
      '.nav-buttons button:last-child'
    ) as HTMLButtonElement;
    nextBtn.click();
    await flush();
    expect(el.ayah).toBe(2);

    // Klik Prev
    const prevBtn = el.shadowRoot?.querySelector(
      '.nav-buttons button:first-child'
    ) as HTMLButtonElement;
    prevBtn.click();
    await flush();
    expect(el.ayah).toBe(1);
  });

  it('responds to quran.goto event', async () => {
    const el = (await fixture(
      html`<quran-right-panel></quran-right-panel>`
    )) as QuranRightPanel;

    el.setProvider(new QuranMockProvider());
    el.surah = 1;
    el.ayah = 1;
    await el.loadVerse();
    await flush();

    // Dispatch event → goto surah 2:2
    window.dispatchEvent(
      new CustomEvent('quran.goto', { detail: { surah: 2, ayah: 2 } })
    );
    await flush();
    await el.updateComplete;

    expect(el.surah).toBe(2);
    expect(el.ayah).toBe(2);
  });

  it('runs search and displays results', async () => {
    // Guard & log: pastikan custom element sudah terdaftar
    const isDefined = !!customElements.get('quran-search-results');
    console.log('[diag] quran-search-results defined =', isDefined);
    expect(isDefined).toBe(true);
    const el = (await fixture(
      html`<quran-right-panel></quran-right-panel>`
    )) as any;

    el.setProvider(new QuranMockProvider());
    await flush();

    const query = 'Dengan';
    window.dispatchEvent(
      new CustomEvent('quran.search', { detail: { query } })
    );

    // 🔹 tunggu beberapa tick update
    await flush();
    await el.updateComplete;
    await Promise.resolve();
    await flush();

    const resultsEl = el.shadowRoot?.querySelector(
      'quran-search-results'
    ) as any;
    expect(resultsEl).toBeTruthy();

    if (resultsEl.updateComplete) await resultsEl.updateComplete;
    await Promise.resolve();

    const resultsText = resultsEl.shadowRoot?.textContent ?? '';

    console.log('==== SEARCH RESULTS RENDERED ====');
    console.log(resultsText);
    console.log('=================================');

    expect(resultsText).toContain(query);
  });
});
