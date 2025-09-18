// packages/quran-data/test/quran-sample-data.spec.ts

import { describe, it, expect } from 'vitest';
import { QURAN_MOCK_SURAHS, QURAN_MOCK_VERSES } from '../src/quran-mock-data';

const key = (v: any) => `${v.surah}:${v.ayah}`;

describe('quran-sample-data', () => {
  it('Al-Fatiha has 7 verses', () => {
    const s1 = QURAN_MOCK_SURAHS.find((s) => s.number === 1)!;
    expect(s1.ayahs.length).toBe(7);
  });

  it('Al-Baqarah contains 2:1–5', () => {
    const have = new Set(
      QURAN_MOCK_VERSES.filter((v) => v.surah === 2).map((v) => v.ayah)
    );
    [1, 2, 3, 4, 5].forEach((n) => expect(have.has(n)).toBe(true));
  });

  it('all verses have required fields and are unique', () => {
    const seen = new Set<string>();
    for (const v of QURAN_MOCK_VERSES) {
      expect(v.text.arabic?.trim().length).toBeGreaterThan(0);
      expect(v.translations.id?.trim().length).toBeGreaterThan(0);
      expect(v.translations.en?.trim().length).toBeGreaterThan(0);
      const k = key(v);
      expect(seen.has(k)).toBe(false);
      seen.add(k);
    }
  });
});
