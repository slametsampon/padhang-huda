// packages/quran-data/test/quran-contract.test.ts

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

import type { QuranVerse, QuranSurah } from '../src/quran-contract';

// Helper untuk load JSON
function loadJson(file: string) {
  const filePath = path.resolve(__dirname, '../public', file);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

describe('Quran Contract compatibility', () => {
  it('should load chapters.json as QuranSurah-like objects', () => {
    const data = loadJson('chapters.json');
    expect(Array.isArray(data.chapters)).toBe(true);

    const first = data.chapters[0];
    // mapping sederhana ke QuranSurah
    const surah: QuranSurah = {
      number: first.id,
      name: {
        arabic: first.name_arabic,
        transliteration: first.name_simple,
        translation: { en: first.translated_name.name },
      },
      revelation: first.revelation_place === 'makka' ? 'Meccan' : 'Madinan',
    };

    expect(surah.number).toBe(1);
    expect(surah.name.transliteration).toBe('Al-Fatihah');
    expect(surah.revelation).toBe('Meccan');
  });

  it('should load verses-surah-1.json as QuranVerse-like objects', () => {
    const data = loadJson('verses-surah-1.json');
    expect(Array.isArray(data.verses)).toBe(true);

    const first = data.verses[0];
    const verse: QuranVerse = {
      surah: first.chapter_id,
      ayah: parseInt(first.verse_key.split(':')[1], 10),
      text: { arabic: first.text_uthmani },
      translations: first.translations.map((t: any) => ({
        id: t.id,
        language_name: t.language_name,
        text: t.text,
      })),
      meta: {
        juz: first.juz_number,
        page: first.page_number,
        hizb: first.hizb_number,
        rubElHizb: first.rub_el_hizb_number,
        sajdah: first.sajdah,
      },
    };

    expect(verse.surah).toBe(1);
    expect(verse.ayah).toBe(1);
    expect(verse.text.arabic).toContain('بِسْمِ');
    expect(verse.translations?.length).toBeGreaterThan(0);
  });
});
