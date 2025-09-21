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
}
