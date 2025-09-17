// packages/quran-viewer/src/quran-viewer.test.ts

import { describe, it, expect, beforeAll } from 'vitest';
import { QuranViewer } from './quran-viewer';
import { QuranMockProvider } from '../../quran-data/src/quran-mock-provider';

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
});
