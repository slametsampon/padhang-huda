// packages/quran-viewer/src/quran-viewer.test.ts

import { describe, it, expect, beforeAll } from 'vitest';
import { QuranViewer } from './quran-viewer';
import { QuranMockProvider } from '../../quran-data/src/quran-mock-provider';

// Helper flush async microtask queue
const flush = () => new Promise((r) => setTimeout(r, 0));

// Daftarkan custom element sekali sebelum test
beforeAll(() => {
  if (!customElements.get('quran-viewer')) {
    customElements.define('quran-viewer', QuranViewer);
  }
});

describe('<quran-viewer>', () => {
  it('should render verse 1:1 with mock provider', async () => {
    const el = document.createElement('quran-viewer') as QuranViewer;
    document.body.appendChild(el);

    el.setProvider(new QuranMockProvider());
    el.surah = 1;
    el.ayah = 1;
    await el.loadVerse();
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain('بِسْمِ اللَّهِ');
    expect(el.shadowRoot?.textContent).toContain('Dengan nama Allah');
  });

  it('should render verse 1:2 when ayah is changed', async () => {
    const el = document.createElement('quran-viewer') as QuranViewer;
    document.body.appendChild(el);

    el.setProvider(new QuranMockProvider());
    el.surah = 1;
    el.ayah = 2;
    await el.loadVerse();
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain('الْحَمْدُ لِلَّهِ');
    expect(el.shadowRoot?.textContent).toContain('Segala puji bagi Allah');
  });

  it('should show not-found message for invalid ayah', async () => {
    const el = document.createElement('quran-viewer') as QuranViewer;
    document.body.appendChild(el);

    el.setProvider(new QuranMockProvider());
    el.surah = 99;
    el.ayah = 1;
    await el.loadVerse();
    await el.updateComplete;

    expect(el.shadowRoot?.textContent).toContain('tidak ditemukan');
  });

  it('should go to next and prev ayah', async () => {
    const el = document.createElement('quran-viewer') as QuranViewer;
    document.body.appendChild(el);

    el.setProvider(new QuranMockProvider());
    el.surah = 1;
    el.ayah = 1;
    await el.loadVerse();
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
    await flush();

    // Kirim event search manual
    el.dispatchEvent(
      new CustomEvent('quran.search', {
        detail: { query: 'Allah' },
        bubbles: true,
        composed: true,
      })
    );
    await el.updateComplete;
    await flush();

    expect(el.shadowRoot?.textContent).toContain('Allah');
    expect(el.shadowRoot?.querySelectorAll('.result').length).toBeGreaterThan(
      0
    );
  });
});
