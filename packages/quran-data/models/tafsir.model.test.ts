// packages/quran-data/models/tafsir.model.test.ts

import { describe, it, expect } from 'vitest';
import type { Tafsir } from '../models';
import {
  fetchTafsirBySurat,
  fetchTafsirBySuratAyat,
} from '../src/services/tafsir.service';

describe('Tafsir Service (Mock)', () => {
  it('should load tafsir for surat 2 (Al-Baqarah)', async () => {
    const tafsirList: Tafsir[] = await fetchTafsirBySurat(2);

    expect(Array.isArray(tafsirList)).toBe(true);
    expect(tafsirList.length).toBeGreaterThan(0);
  });

  it('should get tafsir of first ayat of Al-Baqarah', async () => {
    const tafsir = await fetchTafsirBySuratAyat(2, 1);

    expect(tafsir).toBeDefined();
    expect(tafsir?.ayat).toBe(1);
    expect(tafsir?.teks).toContain('Alif Lam Mim');
  });

  it('should get tafsir of second ayat of Al-Baqarah', async () => {
    const tafsir = await fetchTafsirBySuratAyat(2, 2);

    expect(tafsir).toBeDefined();
    expect(tafsir?.ayat).toBe(2);
    expect(tafsir?.teks).toContain('Al-Qur‘an');
  });
});
