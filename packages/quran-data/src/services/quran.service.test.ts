// packages/quran-data/src/services/quran.service.test.ts

import { describe, it, expect } from 'vitest';
import {
  fetchAllSurat,
  fetchSuratByNomor,
  fetchAyatBySurat,
  fetchAyatBySuratAyat,
  fetchAyatBySuratRange,
  fetchTafsirBySurat,
  fetchTafsirBySuratAyat,
  searchQuran, // 🔍 tambahkan
} from './quran.service';

describe('Quran Service (Mock)', () => {
  /* ------------------------- SURAT ------------------------- */
  it('should load all surat correctly', async () => {
    const daftarSurat = await fetchAllSurat();

    expect(Array.isArray(daftarSurat)).toBe(true);
    expect(daftarSurat.length).toBeGreaterThan(0);

    const fatihah = daftarSurat.find((s) => s.nomor === 1);
    expect(fatihah?.namaLatin).toBe('Al-Fatihah');
    expect(fatihah?.jumlahAyat).toBe(7);
  });

  it('should get surat detail by nomor', async () => {
    const fatihah = await fetchSuratByNomor(1);

    expect(fatihah).toBeDefined();
    expect(fatihah?.namaLatin).toBe('Al-Fatihah');
  });

  /* -------------------------- AYAT ------------------------- */
  it('should load all ayat of a surat', async () => {
    const ayatList = await fetchAyatBySurat(1);

    expect(Array.isArray(ayatList)).toBe(true);
    expect(ayatList.length).toBe(7);

    expect(ayatList[0].teksIndonesia).toContain('Dengan nama Allah');
  });

  it('should get specific ayat', async () => {
    const ayat = await fetchAyatBySuratAyat(1, 1);

    expect(ayat).toBeDefined();
    expect(ayat?.nomorAyat).toBe(1);
    expect(ayat?.teksLatin).toContain('Bismillāhir-raḥmānir-raḥīm');
  });

  it('should get range of ayat', async () => {
    const range = await fetchAyatBySuratRange(1, 2, 3);

    expect(range.length).toBe(2);
    expect(range[0].nomorAyat).toBe(2);
    expect(range[1].nomorAyat).toBe(3);
  });

  /* ------------------------- TAFSIR ------------------------ */
  it('should load tafsir for surat', async () => {
    const tafsirList = await fetchTafsirBySurat(2);

    expect(Array.isArray(tafsirList)).toBe(true);
    expect(tafsirList.length).toBeGreaterThan(0);

    expect(tafsirList[0].ayat).toBe(1);
    expect(tafsirList[0].teks).toContain('Alif Lam Mim');
  });

  it('should get tafsir by surat & ayat', async () => {
    const tafsir = await fetchTafsirBySuratAyat(2, 2);

    expect(tafsir).toBeDefined();
    expect(tafsir?.ayat).toBe(2);
    expect(tafsir?.teks).toContain('Al-Qur‘an');
  });

  /* ------------------------- SEARCH ------------------------ */
  it('should search ayat by Indonesian translation', async () => {
    const results = await searchQuran('Segala puji');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].teksIndonesia).toContain('Segala puji');
  });

  it('should search ayat by Arabic text', async () => {
    const results = await searchQuran('بِسْمِ', 'arab'); // ⬅️ tambahkan lang=arab
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].teksArab).toContain('بِسْمِ');
  });

  it('should return empty array if query not found', async () => {
    const results = await searchQuran('TidakAdaKataIni');
    expect(results).toEqual([]);
  });
});
