// packages/quran-data/src/repositories/mock/MockSuratRepository.ts

import { SuratRepository } from '../interfaces/SuratRepository';
import type { Surat } from '../../../models/surat.model';
import type { ApiResponse } from '../../../models/api.model';
import { fetchMockData } from '../../services/mock-data.service';

export class MockSuratRepository implements SuratRepository {
  private cache: Surat[] | null = null;

  async getAll(): Promise<Surat[]> {
    if (!this.cache) {
      const raw = await fetchMockData<ApiResponse<Surat[]>>(
        'daftar-surat.json'
      );
      this.cache = raw.data ?? [];
    }
    return this.cache;
  }

  async getByNomor(nomorSurat: number): Promise<Surat | undefined> {
    const all = await this.getAll();
    return all.find((s) => s.nomor === nomorSurat);
  }
}
