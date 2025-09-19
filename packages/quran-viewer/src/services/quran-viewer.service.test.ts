// packages/quran-viewer/src/services/quran-viewer.service.test.ts

import { describe, it, expect } from 'vitest';
import { QuranViewerService } from './quran-viewer.service';

// Fake provider agar test tidak tergantung jaringan/real data
import type {
  QuranVerse,
  QuranSurah,
  QuranDataProvider,
} from '../../../quran-data/src/quran-contract';

class FakeProvider implements QuranDataProvider {
  private verses: QuranVerse[] = [
    {
      surah: 1,
      ayah: 1,
      text: { arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' },
      translations: {
        id: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang',
        en: 'In the name of Allah, the Entirely Merciful, the Especially Merciful',
      },
    },
    {
      surah: 1,
      ayah: 2,
      text: { arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ' },
      translations: {
        id: 'Segala puji bagi Allah, Tuhan semesta alam',
        en: 'All praise is [due] to Allah, Lord of the worlds',
      },
    },
  ];

  async getVerse(surah: number, ayah: number): Promise<QuranVerse | undefined> {
    return this.verses.find((v) => v.surah === surah && v.ayah === ayah);
  }

  async getAllVerses(): Promise<QuranVerse[]> {
    return this.verses;
  }

  async getSurah(surah: number): Promise<QuranSurah | undefined> {
    if (surah !== 1) return undefined;
    return {
      number: 1,
      name: {
        arabic: 'الفاتحة',
        transliteration: 'Al-Fatihah',
        translation: { id: 'Pembukaan', en: 'The Opening' },
      },
      revelation: 'Meccan',
      ayahs: this.verses,
    };
  }

  async search(query: string, lang = 'id'): Promise<QuranVerse[]> {
    const q = query.toLowerCase();
    return this.verses.filter(
      (v) =>
        v.translations[lang]?.toLowerCase().includes(q) ||
        v.text.arabic.includes(query)
    );
  }
}

describe('QuranViewerService', () => {
  const service = new QuranViewerService(new FakeProvider());

  it('getVerse returns correct verse', async () => {
    const v = await service.getVerse(1, 2);
    expect(v?.text.arabic).toContain('الْحَمْدُ');
  });

  it('getTranslation returns translation by lang', () => {
    const v = {
      surah: 1,
      ayah: 1,
      text: { arabic: '...' } as any,
      translations: { id: 'ID', en: 'EN' } as any,
    } as QuranVerse;

    expect(service.getTranslation(v, 'id')).toBe('ID');
    expect(service.getTranslation(v, 'en')).toBe('EN');
  });

  it('searchVerses matches translation and arabic', async () => {
    const byTrans = await service.searchVerses('puji', 'id');
    expect(byTrans.length).toBe(1);
    expect(byTrans[0].ayah).toBe(2);

    const byArabic = await service.searchVerses('الرَّحِيمِ', 'id');
    expect(byArabic.length).toBe(1);
    expect(byArabic[0].ayah).toBe(1);
  });

  it('highlight wraps matches safely (regex-escaped)', () => {
    const out = service.highlight('aa (test) bb', '(test)');
    expect(out).toBe('aa <span class="highlight">(test)</span> bb');
  });
});
