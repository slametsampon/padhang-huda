// packages/quran-data/src/repositories/api/ApiEquranSuratRepository.ts

import { Surat } from '../../../models/surat.model';
import { SuratRepository } from '../interfaces/surat.repository';
import {
  EquranSuratRaw,
  mapEquranSurat,
} from '../../adapters/equran.surat.adapter';

export class EquranSuratRepository implements SuratRepository {
  private baseUrl = 'https://equran.id/api/surat';

  async getAll(): Promise<Surat[]> {
    const res = await fetch(this.baseUrl);
    const json = await res.json();
    return json.data.map((s: EquranSuratRaw) => mapEquranSurat(s));
  }

  async getById(id: number): Promise<Surat | null> {
    const res = await fetch(`${this.baseUrl}/${id}`);
    const json = await res.json();
    return mapEquranSurat(json.data as EquranSuratRaw);
  }
}
