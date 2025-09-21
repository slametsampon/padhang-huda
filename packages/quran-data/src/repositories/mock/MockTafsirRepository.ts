// packages/quran-data/src/repositories/mock/MockTafsirRepository.ts

import { TafsirRepository } from '../interfaces/TafsirRepository';
import type { Tafsir } from '../../../models';
import { fetchMockData } from '../../services/mock-data.service';

export class MockTafsirRepository implements TafsirRepository {
  private cache: Record<number, Tafsir[]> = {};

  async getBySurat(nomorSurat: number): Promise<Tafsir[]> {
    if (!this.cache[nomorSurat]) {
      const raw = await fetchMockData<any>(`tafsir-${nomorSurat}.json`);
      this.cache[nomorSurat] = raw?.data?.tafsir ?? [];
    }
    return this.cache[nomorSurat];
  }

  async getBySuratAyat(
    nomorSurat: number,
    nomorAyat: number
  ): Promise<Tafsir | undefined> {
    const tafsirList = await this.getBySurat(nomorSurat);
    return tafsirList.find((t) => t.ayat === nomorAyat);
  }
}
