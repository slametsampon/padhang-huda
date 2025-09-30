// packages/quran-data/src/repositories/mock/MockEquranAyatRepository.ts

import { Ayat } from '../../../models/ayat.model';
import { AyatRepository } from '../interfaces/ayat.repository';
import { fetchMockData } from '../../services/mock-data.service';
import {
  EquranAyatRaw,
  mapEquranAyat,
} from '../../adapters/equran.ayat.adapter';

export class MockEquranAyatRepository implements AyatRepository {
  async getBySurat(suratId: number): Promise<Ayat[]> {
    const data = await fetchMockData<{ data: { ayat: EquranAyatRaw[] } }>(
      `equran-surat-${suratId}.json`
    );
    return data.data.ayat.map((a: EquranAyatRaw) => mapEquranAyat(a, suratId));
  }

  async getById(id: number): Promise<Ayat | null> {
    const surahId = Math.floor(id / 1000);
    const ayatNum = id % 1000;
    const data = await fetchMockData<{ data: { ayat: EquranAyatRaw[] } }>(
      `equran-surat-${surahId}.json`
    );
    const found = data.data.ayat.find((a) => a.nomorAyat === ayatNum);
    return found ? mapEquranAyat(found, surahId) : null;
  }
}
