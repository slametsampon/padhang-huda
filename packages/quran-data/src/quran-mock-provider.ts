// packages/quran-data/src/quran-mock-provider.ts

import type {
  QuranDataProvider,
  QuranVerse,
  QuranSurah,
} from './quran-contract';
import { QURAN_MOCK_VERSES, QURAN_MOCK_SURAHS } from './quran-mock-data';

/**
 * QuranMockProvider — implementasi sederhana dari QuranDataProvider
 * menggunakan dataset kecil (mock).
 */
export class QuranMockProvider implements QuranDataProvider {
  private verses = QURAN_MOCK_VERSES;
  private surahs = QURAN_MOCK_SURAHS;
  private index: Map<string, QuranVerse>;

  constructor() {
    this.index = new Map(this.verses.map((v) => [`${v.surah}:${v.ayah}`, v]));
  }

  async getVerse(surah: number, ayah: number): Promise<QuranVerse | undefined> {
    return this.index.get(`${surah}:${ayah}`);
  }

  async getSurah(surah: number): Promise<QuranSurah | undefined> {
    return this.surahs.find((s) => s.number === surah);
  }

  async search(query: string, lang: string = 'id'): Promise<QuranVerse[]> {
    return this.verses.filter(
      (v) =>
        (v.translations[lang] ?? '').includes(query) ||
        v.text.arabic.includes(query)
    );
  }
}
