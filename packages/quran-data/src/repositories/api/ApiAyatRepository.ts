// packages/quran-data/src/repositories/api/ApiAyatRepository.ts

import { AyatRepository } from '../interfaces/AyatRepository';
import type { Ayat } from '../../../models/ayat.model';
import type { SuratResponse, RawAyat } from '../../../models/api.model';

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

export class ApiAyatRepository implements AyatRepository {
  private baseUrl = 'https://api.example.com'; // ganti dengan endpoint Qur'an API Anda

  async getBySurat(nomorSurat: number): Promise<Ayat[]> {
    const res = await fetch(`${this.baseUrl}/surat/${nomorSurat}`);
    if (!res.ok) {
      throw new Error(
        `[ApiAyatRepository] Gagal fetch surat ${nomorSurat}: ${res.statusText}`
      );
    }
    const raw: SuratResponse = await res.json();
    return raw.data.ayat.map((a) => mapRawAyat(a, nomorSurat));
  }

  async getBySuratAyat(
    nomorSurat: number,
    nomorAyat: number
  ): Promise<Ayat | undefined> {
    const res = await fetch(
      `${this.baseUrl}/surat/${nomorSurat}/ayat/${nomorAyat}`
    );
    if (!res.ok) {
      throw new Error(
        `[ApiAyatRepository] Gagal fetch ayat ${nomorSurat}:${nomorAyat} → ${res.statusText}`
      );
    }
    const raw: { data: RawAyat } = await res.json();
    return raw?.data ? mapRawAyat(raw.data, nomorSurat) : undefined;
  }

  async getBySuratRange(
    nomorSurat: number,
    from: number,
    to: number
  ): Promise<Ayat[]> {
    // fallback generic: fetch semua lalu filter
    const all = await this.getBySurat(nomorSurat);
    return all.filter((a) => a.nomorAyat >= from && a.nomorAyat <= to);
  }
}
