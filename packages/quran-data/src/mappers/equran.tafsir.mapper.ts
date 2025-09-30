// packages/quran-viewer/src/mappers/equran.tafsir.mapper.ts

import { Tafsir } from '../../models/tafsir.model';

export interface EquranSuratRaw {
  nomor: number;
  deskripsi: string;
}

export function mapEquranTafsir(raw: EquranSuratRaw): Tafsir {
  return {
    id: raw.nomor,
    verseId: 0, // equran.id tidak punya tafsir per ayat, hanya deskripsi surat
    language: 'indonesian',
    name: 'Deskripsi Surah',
    text: raw.deskripsi,
  };
}
