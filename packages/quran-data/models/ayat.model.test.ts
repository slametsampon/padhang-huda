// packages/quran-data/models/ayat.model.test.ts

import { describe, it, expect } from 'vitest';
import type { Ayat } from './ayat.model';
import {
  fetchAyatBySurat,
  fetchAyatBySuratAyat,
  fetchAyatBySuratRange,
} from '../src/services/ayat.service';

describe('Ayat Service (Mock)', () => {
  it('should load all ayat of surat 1 (Al-Fatihah)', async () => {
    const ayatList: Ayat[] = await fetchAyatBySurat(1);

    expect(Array.isArray(ayatList)).toBe(true);
    expect(ayatList.length).toBe(7); // Al-Fatihah punya 7 ayat
  });

  it('should get first ayat of Al-Fatihah', async () => {
    const ayat = await fetchAyatBySuratAyat(1, 1);

    expect(ayat).toBeDefined();
    expect(ayat?.nomorSurat).toBe(1);
    expect(ayat?.nomorAyat).toBe(1);
    expect(ayat?.teksIndonesia).toContain('Dengan nama Allah');
  });

  it('should get range of ayat (2–3) of Al-Fatihah', async () => {
    const ayatRange = await fetchAyatBySuratRange(1, 2, 3);

    expect(Array.isArray(ayatRange)).toBe(true);
    expect(ayatRange.length).toBe(2);
    expect(ayatRange[0].nomorAyat).toBe(2);
    expect(ayatRange[1].nomorAyat).toBe(3);
  });
});
