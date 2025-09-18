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

export class JsonQuranDataProvider implements QuranDataProvider {
  private chaptersCache?: QuranApiChaptersResponse;

  async getSurah(surah: number): Promise<QuranSurah | undefined> {
    console.log('[JsonQuranProvider] getSurah →', surah);
    const chapters = await this.loadChapters();
    const chapter = chapters.find((c) => c.id === surah);
    if (!chapter) {
      console.warn(`[JsonQuranProvider] Surah ${surah} tidak ditemukan`);
      return undefined;
    }

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
    console.log(`[JsonQuranProvider] getVerse → ${surah}:${ayah}`);
    const verses = await this.loadVerses(surah);
    const verse = verses.find(
      (v) => parseInt(v.verse_key.split(':')[1], 10) === ayah
    );
    if (!verse) {
      console.warn(`[JsonQuranProvider] Ayah ${surah}:${ayah} tidak ditemukan`);
      return undefined;
    }
    return this.mapVerse(verse);
  }

  async search(query: string, lang = 'english'): Promise<QuranVerse[]> {
    console.log(`[JsonQuranProvider] search → "${query}", lang=${lang}`);
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
      } catch (err) {
        console.warn(
          `[JsonQuranProvider] Skip surah ${chapter.id}, error loadVerses:`,
          err
        );
        continue;
      }
    }
    console.log(`[JsonQuranProvider] search result count = ${results.length}`);
    return results;
  }

  async getAllVerses(): Promise<QuranVerse[]> {
    console.log('[JsonQuranProvider] getAllVerses');
    const chapters = await this.loadChapters();
    const all: QuranVerse[] = [];

    for (const chapter of chapters) {
      try {
        const verses = await this.loadVerses(chapter.id);
        all.push(...verses.map((v) => this.mapVerse(v)));
      } catch (err) {
        console.warn(
          `[JsonQuranProvider] Skip surah ${chapter.id}, error loadVerses:`,
          err
        );
        continue;
      }
    }
    console.log(
      `[JsonQuranProvider] getAllVerses total loaded = ${all.length}`
    );
    return all;
  }

  // === Private helpers ===

  private async loadChapters() {
    if (this.chaptersCache) return this.chaptersCache.chapters;

    if (isNodeEnv()) {
      // Node.js (test/dev)
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
      // Browser (prod) → langsung fetch dari public/quran-data
      const url = `/quran-data/chapters.json`;
      console.log('[JsonQuranProvider] loadChapters (browser) fetch:', url);
      const res = await fetch(url);
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
      const url = `/quran-data/verses-surah-${surah}.json`;
      console.log(`[JsonQuranProvider] loadVerses (browser) fetch:`, url);
      const res = await fetch(url);
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
