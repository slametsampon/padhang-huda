// packages/quran-data/src/repositories/api/ApiTafsirRepository.ts

import { TafsirRepository } from '../interfaces/TafsirRepository';
import type { Tafsir } from '../../../models';

export class ApiTafsirRepository implements TafsirRepository {
  private baseUrl = 'https://api.example.com'; // ganti dengan URL API Qur'an

  async getBySurat(nomorSurat: number): Promise<Tafsir[]> {
    const res = await fetch(`${this.baseUrl}/tafsir/${nomorSurat}`);
    if (!res.ok) {
      throw new Error(
        `[ApiTafsirRepository] Gagal fetch tafsir surat ${nomorSurat}: ${res.statusText}`
      );
    }
    const data = await res.json();
    return data?.tafsir ?? [];
  }

  async getBySuratAyat(
    nomorSurat: number,
    nomorAyat: number
  ): Promise<Tafsir | undefined> {
    const res = await fetch(
      `${this.baseUrl}/tafsir/${nomorSurat}/ayat/${nomorAyat}`
    );
    if (!res.ok) {
      throw new Error(
        `[ApiTafsirRepository] Gagal fetch tafsir ${nomorSurat}:${nomorAyat} → ${res.statusText}`
      );
    }
    const data = await res.json();
    return data?.tafsir ?? undefined;
  }
}
