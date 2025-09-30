// packages/quran-data/src/repositories/api/ApiEquranAyatRepository.ts

import { Ayat } from '../../../models/ayat.model';
import { AyatRepository } from '../interfaces/AyatRepository';
import {
  EquranAyatRaw,
  mapEquranAyat,
} from '../../adapters/equran.ayat.adapter';

export class ApiEquranAyatRepository implements AyatRepository {
  private baseUrl = 'https://equran.id/api/surat';

  async getBySurat(suratId: number): Promise<Ayat[]> {
    const res = await fetch(`${this.baseUrl}/${suratId}`);
    const json = await res.json();
    return json.data.ayat.map((a: EquranAyatRaw) => mapEquranAyat(a, suratId));
  }

  async getById(id: number): Promise<Ayat | null> {
    const surahId = Math.floor(id / 1000);
    const ayatNum = id % 1000;
    const res = await fetch(`${this.baseUrl}/${surahId}`);
    const json = await res.json();
    const found = json.data.ayat.find(
      (a: EquranAyatRaw) => a.nomorAyat === ayatNum
    );
    return found ? mapEquranAyat(found, surahId) : null;
  }
}
