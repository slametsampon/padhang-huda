// packages/quran-viewer/src/quran-viewer.test.ts

import { describe, it, expect, beforeAll } from 'vitest';
import { QuranViewer } from './quran-viewer';
import { QuranMockProvider } from '../../quran-data/src/quran-mock-provider';
import { JsonQuranDataProvider } from '../../quran-data/src/providers/json-quran-provider';

// Helper flush async microtask queue
const flush = () => new Promise((r) => setTimeout(r, 0));

// Daftarkan custom element sekali sebelum test
beforeAll(() => {
  if (!customElements.get('quran-viewer')) {
    customElements.define('quran-viewer', QuranViewer);
  }

  // Mock fetch untuk quran-surah-selector → kembalikan shape { chapters: [...] }
  (global as any).fetch = async (
    input: RequestInfo | URL,
    _init?: RequestInit
  ) => {
    const url = typeof input === 'string' ? input : input.toString();

    if (
      url.endsWith('/quran-data/chapters.json') ||
      url.includes('chapters.json')
    ) {
      return new Response(
        JSON.stringify({
          chapters: [
            {
              id: 1,
              name_simple: 'Al-Fatihah',
              name_arabic: 'الفاتحة',
              revelation_place: 'meccan',
              verses_count: 7,
              pages: [1, 1],
            },
            {
              id: 2,
              name_simple: 'Al-Baqarah',
              name_arabic: 'البقرة',
              revelation_place: 'medinan',
              verses_count: 286,
              pages: [2, 49],
            },
          ],
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }
    return new Response('{}', { status: 404 });
  };
});

describe('<quran-viewer>', () => {
  it('should render verse 1:1 with mock provider', async () => {
    const el = document.createElement('quran-viewer') as QuranViewer;
    document.body.appendChild(el);

    el.setProvider(new QuranMockProvider());
    el.surah = 1;
    el.ayah = 1;
    await el.loadVerse();
    await flush();
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain('بِسْمِ اللَّهِ');
    // ✅ MockProvider sekarang sudah punya translasi bahasa Indonesia
    expect(el.shadowRoot?.textContent).toContain('Dengan nama Allah');
  });

  it('should render verse 1:2 when ayah is changed', async () => {
    const el = document.createElement('quran-viewer') as QuranViewer;

    el.setProvider(new QuranMockProvider());
    el.surah = 1;
    el.ayah = 2;

    document.body.appendChild(el);
    await el.updateComplete;
    await flush();

    expect(el.shadowRoot?.textContent).toContain('الْحَمْدُ لِلَّهِ');
    expect(el.shadowRoot?.textContent).toContain('Segala puji bagi Allah');
  });

  it('should show not-found message for invalid ayah', async () => {
    const el = document.createElement('quran-viewer') as QuranViewer;

    el.setProvider(new QuranMockProvider());
    el.surah = 1;
    el.ayah = 999; // ayah tidak ada

    document.body.appendChild(el);
    await el.updateComplete;
    await flush();

    expect(el.shadowRoot?.textContent).toContain('tidak ditemukan');
  });

  it('should go to next and prev ayah', async () => {
    const el = document.createElement('quran-viewer') as QuranViewer;
    document.body.appendChild(el);

    el.setProvider(new QuranMockProvider());
    el.surah = 1;
    el.ayah = 1;
    await el.loadVerse();
    await flush();
    await el.updateComplete;

    // Klik tombol Next
    (
      el.shadowRoot?.querySelector(
        '.nav-buttons button:last-child'
      ) as HTMLButtonElement
    ).click();
    await flush();
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain('الْحَمْدُ لِلَّهِ');

    // Klik tombol Prev
    (
      el.shadowRoot?.querySelector(
        '.nav-buttons button:first-child'
      ) as HTMLButtonElement
    ).click();
    await flush();
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain('بِسْمِ اللَّهِ');
  });

  it('should respond to quran.goto event', async () => {
    const el = document.createElement('quran-viewer') as QuranViewer;
    document.body.appendChild(el);

    el.setProvider(new QuranMockProvider());
    el.surah = 1;
    el.ayah = 1;
    await el.loadVerse();
    await flush();
    await el.updateComplete;

    // Dispatch event untuk pindah ke surah 2:2
    window.dispatchEvent(
      new CustomEvent('quran.goto', { detail: { surah: 2, ayah: 2 } })
    );
    await flush();
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain('ذَٰلِكَ الْكِتَابُ');
  });

  it('should show search results', async () => {
    const el = document.createElement('quran-viewer') as QuranViewer;
    document.body.appendChild(el);

    el.setProvider(new QuranMockProvider());
    await el.updateComplete;

    // trigger pencarian (viewer listen di window)
    const query = 'Dengan'; // pasti ada di MockProvider
    window.dispatchEvent(
      new CustomEvent('quran.search', { detail: { query } })
    );

    // sinkronisasi update: viewer -> setState -> render -> anak render
    await Promise.resolve();
    await el.updateComplete;
    await Promise.resolve();

    // ambil komponen hasil pencarian
    const resultsEl = el.shadowRoot?.querySelector(
      'quran-search-results'
    ) as any;
    expect(resultsEl).toBeTruthy();

    // tunggu update di komponen anak
    if (resultsEl?.updateComplete) await resultsEl.updateComplete;
    await Promise.resolve();

    // cek isi shadow DOM anak
    const resultsRoot = resultsEl.shadowRoot as ShadowRoot | null;
    expect(resultsRoot?.textContent).toContain(query);
    expect(resultsRoot?.querySelectorAll('.result').length).toBeGreaterThan(0);
  });

  it('should render verse 1:1 with JsonQuranDataProvider', async () => {
    const el = document.createElement('quran-viewer') as QuranViewer;
    document.body.appendChild(el);

    el.setProvider(new JsonQuranDataProvider());
    el.surah = 1;
    el.ayah = 1;
    await el.loadVerse();
    await flush();
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain('بِسْمِ اللَّهِ');
  });
});
