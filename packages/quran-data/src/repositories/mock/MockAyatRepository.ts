// packages/quran-data/src/repositories/mock/MockAyatRepository.ts

import { AyatRepository } from '../interfaces/AyatRepository';
import type { Ayat } from '../../../models/ayat.model';
import type { SuratResponse, RawAyat } from '../../../models/api.model';
import { fetchMockData } from '../../services/mock-data.service';

function mapRawAyat(raw: RawAyat, nomorSurat: number): Ayat {
  return {
    nomorSurat,
    nomorAyat: raw.nomorAyat,
    nomorJuz: (raw as any).nomorJuz ?? 0,
    nomorHalaman: (raw as any).nomorHalaman ?? 0,
    teksArab: raw.teksArab,
    teksLatin: raw.teksLatin,
    teksIndonesia: raw.teksIndonesia,
    audio: raw.audio,
  };
}

export class MockAyatRepository implements AyatRepository {
  private cache: Record<number, Ayat[]> = {};

  async getBySurat(nomorSurat: number): Promise<Ayat[]> {
    if (!this.cache[nomorSurat]) {
      const raw = await fetchMockData<SuratResponse>(
        `surat-${nomorSurat}.json`
      );
      const ayatRaw: RawAyat[] = raw.data.ayat ?? [];
      this.cache[nomorSurat] = ayatRaw.map((a) => mapRawAyat(a, nomorSurat));
    }
    return this.cache[nomorSurat];
  }

  async getBySuratAyat(
    nomorSurat: number,
    nomorAyat: number
  ): Promise<Ayat | undefined> {
    const ayatList = await this.getBySurat(nomorSurat);
    return ayatList.find((a) => a.nomorAyat === nomorAyat);
  }

  async getBySuratRange(
    nomorSurat: number,
    from: number,
    to: number
  ): Promise<Ayat[]> {
    const ayatList = await this.getBySurat(nomorSurat);
    return ayatList.filter((a) => a.nomorAyat >= from && a.nomorAyat <= to);
  }

  /** 🔍 Local search */
  async search(query: string, lang: string = 'id'): Promise<Ayat[]> {
    const allSuratNomor = Object.keys(this.cache).map(Number);
    // Pastikan minimal Al-Fatihah sudah di-load
    if (allSuratNomor.length === 0) {
      await this.getBySurat(1);
    }
    const allAyat = Object.values(this.cache).flat();

    return allAyat.filter((a) => {
      if (lang === 'id') return a.teksIndonesia.includes(query);
      if (lang === 'latin') return a.teksLatin.includes(query);
      if (lang === 'arab') return a.teksArab.includes(query);
      return (
        a.teksIndonesia.includes(query) ||
        a.teksLatin.includes(query) ||
        a.teksArab.includes(query)
      );
    });
  }
}
