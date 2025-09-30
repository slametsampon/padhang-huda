// packages/quran-data/src/repositories/mock/MockEquranTafsirRepository.ts

import { Tafsir } from '../../../models/tafsir.model';
import { TafsirRepository } from '../interfaces/tafsir.repository';
import { fetchMockData } from '../../services/mock-data.service';
import {
  EquranSuratRaw,
  mapEquranTafsir,
} from '../../adapters/equran.tafsir.adapter';

export class MockEquranTafsirRepository implements TafsirRepository {
  async getByVerse(verseId: number): Promise<Tafsir[]> {
    const surahId = Math.floor(verseId / 1000);
    const data = await fetchMockData<{ data: EquranSuratRaw }>(
      `equran-surat-${surahId}.json`
    );
    return [mapEquranTafsir(data.data)];
  }
}
