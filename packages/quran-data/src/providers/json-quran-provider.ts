// packages/quran-data/src/providers/json-quran-provider.ts

import type {
  QuranVerse,
  QuranSurah,
  QuranDataProvider,
  QuranTranslation,
} from '../quran-contract';

import type {
  QuranApiChaptersResponse,
  QuranApiVersesResponse,
} from '../../types/quran-api-types';

// Detect Node.js
function isNodeEnv() {
  return typeof process !== 'undefined' && process.versions?.node;
}

/**
 * JsonQuranDataProvider
 * - Load data dari public/mock JSON
 * - Format identik Quran.com API
 */
export class JsonQuranDataProvider implements QuranDataProvider {
  private chaptersCache?: QuranApiChaptersResponse;

  async getSurah(surah: number): Promise<QuranSurah | undefined> {
    const chapters = await this.loadChapters();
    const chapter = chapters.find((c) => c.id === surah);
    if (!chapter) return undefined;

    return {
      number: chapter.id,
      name: {
        arabic: chapter.name_arabic,
        transliteration: chapter.name_simple,
        translation: { en: chapter.translated_name.name },
      },
      revelation: chapter.revelation_place === 'makka' ? 'Meccan' : 'Madinan',
    };
  }

  async getVerse(surah: number, ayah: number): Promise<QuranVerse | undefined> {
    const verses = await this.loadVerses(surah);
    const verse = verses.find(
      (v) => parseInt(v.verse_key.split(':')[1], 10) === ayah
    );
    if (!verse) return undefined;
    return this.mapVerse(verse);
  }

  async search(query: string, lang = 'english'): Promise<QuranVerse[]> {
    const results: QuranVerse[] = [];
    const chapters = await this.loadChapters();

    for (const chapter of chapters) {
      try {
        const verses = await this.loadVerses(chapter.id);
        for (const v of verses) {
          const translation = v.translations.find(
            (t) => t.language_name.toLowerCase() === lang.toLowerCase()
          );
          if (
            v.text_uthmani.includes(query) ||
            (translation && translation.text.includes(query))
          ) {
            results.push(this.mapVerse(v));
          }
        }
      } catch {
        continue; // Abaikan surah yg belum ada file JSON
      }
    }
    return results;
  }

  async getAllVerses(): Promise<QuranVerse[]> {
    const chapters = await this.loadChapters();
    const all: QuranVerse[] = [];

    for (const chapter of chapters) {
      try {
        const verses = await this.loadVerses(chapter.id);
        all.push(...verses.map((v) => this.mapVerse(v)));
      } catch {
        continue;
      }
    }
    return all;
  }

  // === Private helpers ===

  private async loadChapters() {
    if (this.chaptersCache) return this.chaptersCache.chapters;

    if (isNodeEnv()) {
      const fs = await import('fs');
      const path = await import('path');
      const { fileURLToPath } = await import('url');

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      const filePath = path.resolve(__dirname, '../../public/chapters.json');
      const raw = fs.readFileSync(filePath, 'utf-8');
      const data: QuranApiChaptersResponse = JSON.parse(raw);
      this.chaptersCache = data;
      return data.chapters;
    } else {
      // ⬇ perbaiki path: tidak pakai /mock
      const res = await fetch('/chapters.json');
      const data: QuranApiChaptersResponse = await res.json();
      this.chaptersCache = data;
      return data.chapters;
    }
  }

  private async loadVerses(surah: number) {
    if (isNodeEnv()) {
      const fs = await import('fs');
      const path = await import('path');
      const { fileURLToPath } = await import('url');

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      const filePath = path.resolve(
        __dirname,
        `../../public/verses-surah-${surah}.json`
      );
      const raw = fs.readFileSync(filePath, 'utf-8');
      const data: QuranApiVersesResponse = JSON.parse(raw);
      return data.verses;
    } else {
      // ⬇ perbaiki path: tidak pakai /mock
      const res = await fetch(`/verses-surah-${surah}.json`);
      const data: QuranApiVersesResponse = await res.json();
      return data.verses;
    }
  }

  private mapVerse(v: any): QuranVerse {
    return {
      surah: v.chapter_id,
      ayah: parseInt(v.verse_key.split(':')[1], 10),
      text: { arabic: v.text_uthmani },
      translations: v.translations.map(
        (t: any): QuranTranslation => ({
          id: t.id,
          language_name: t.language_name,
          text: t.text,
        })
      ),
      meta: {
        juz: v.juz_number,
        page: v.page_number,
        hizb: v.hizb_number,
        rubElHizb: v.rub_el_hizb_number,
        sajdah: v.sajdah,
      },
    };
  }
}
