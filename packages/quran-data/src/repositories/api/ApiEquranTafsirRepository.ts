// packages/quran-data/src/repositories/api/ApiEquranTafsirRepository.ts

import { Tafsir } from '../../../models/tafsir.model';
import { TafsirRepository } from '../interfaces/tafsir.repository';
import {
  EquranSuratRaw,
  mapEquranTafsir,
} from '../../adapters/equran.tafsir.adapter';

export class EquranTafsirRepository implements TafsirRepository {
  private baseUrl = 'https://equran.id/api/surat';

  async getByVerse(verseId: number): Promise<Tafsir[]> {
    // equran.id hanya ada deskripsi surat, bukan tafsir per ayat
    const surahId = Math.floor(verseId / 1000);
    const res = await fetch(`${this.baseUrl}/${surahId}`);
    const json = await res.json();
    return [mapEquranTafsir(json.data as EquranSuratRaw)];
  }
}
