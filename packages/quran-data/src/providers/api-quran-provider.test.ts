// packages/quran-data/src/providers/api-quran-provider.test.ts

import { describe, it, expect, vi } from 'vitest';
import { ApiQuranProvider } from './api-quran-provider';

// Buat mock data API surah minimal
const mockSurahResponse = {
  number: 1,
  name_ar: 'الفاتحة',
  name_en: 'Al-Fatihah',
  translit: 'Al-Fatihah',
  revelation: 'Meccan' as const,
  ayahs: [
    {
      surah: 1,
      ayah: 1,
      text_ar: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      tr_id: 'Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang',
      tr_en:
        'In the name of Allah, the Entirely Merciful, the Especially Merciful',
      juz: 1,
      page: 1,
    },
  ],
};

describe('ApiQuranProvider.getAllVerses', () => {
  it('returns verses aggregated from getSurah', async () => {
    // Mock fetchFn agar hanya mengembalikan mockSurahResponse
    const fetchFn = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockSurahResponse,
    });

    const provider = new ApiQuranProvider({
      baseUrl: 'http://fake.api',
      fetchFn,
    });

    // Jalankan hanya untuk surah pertama
    const verses = await provider.getAllVerses();

    expect(Array.isArray(verses)).toBe(true);
    expect(verses.length).toBeGreaterThan(0);
    expect(verses[0].text.arabic).toContain('بِسْمِ');
  });

  it('handles API failure gracefully', async () => {
    // Mock fetchFn selalu throw error
    const fetchFn = vi.fn().mockRejectedValue(new Error('network error'));

    const provider = new ApiQuranProvider({
      baseUrl: 'http://fake.api',
      fetchFn,
    });

    const verses = await provider.getAllVerses();

    expect(Array.isArray(verses)).toBe(true);
    expect(verses.length).toBe(0); // gagal → array kosong
  });
});
