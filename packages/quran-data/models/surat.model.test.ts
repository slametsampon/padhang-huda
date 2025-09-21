// packages/quran-data/models/surat.model.test.ts

import { describe, it, expect } from 'vitest';
import {
  fetchAllSurat,
  fetchSuratByNomor,
} from '../src/services/surat.service';
import type { Surat } from './surat.model';

describe('Surat Service (Mock)', () => {
  it('should load daftar-surat.json correctly via service', async () => {
    const daftarSurat: Surat[] = await fetchAllSurat();
    expect(Array.isArray(daftarSurat)).toBe(true);
    expect(daftarSurat.length).toBeGreaterThan(0);
  });

  it('should validate first surat (Al-Fatihah) via service', async () => {
    const fatihah = await fetchSuratByNomor(1);

    expect(fatihah).toBeDefined();
    expect(fatihah?.namaLatin).toBe('Al-Fatihah');
    expect(fatihah?.jumlahAyat).toBe(7);
    expect(fatihah?.tempatTurun).toBe('Mekah');
  });
});
