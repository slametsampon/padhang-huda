// packages/quran-data/src/repositories/mock/MockEquranSuratRepository.ts

import { Surat } from '../../../models/surat.model';
import { SuratRepository } from '../interfaces/surat.repository';
import { fetchMockData } from '../../services/mock-data.service';
import {
  EquranSuratRaw,
  mapEquranSurat,
} from '../../adapters/equran.surat.adapter';

export class MockEquranSuratRepository implements SuratRepository {
  async getAll(): Promise<Surat[]> {
    const data = await fetchMockData<{ data: EquranSuratRaw[] }>(
      'equran-surat.json'
    );
    return data.data.map(mapEquranSurat);
  }

  async getById(id: number): Promise<Surat | null> {
    const data = await fetchMockData<{ data: EquranSuratRaw }>(
      `equran-surat-${id}.json`
    );
    return mapEquranSurat(data.data);
  }
}
