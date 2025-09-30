// packages/quran-data/src/mappers/equran.ayat.mapper.ts

import { Ayat } from '../../models/ayat.model';

export interface EquranAyatRaw {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
}

export function mapEquranAyat(raw: EquranAyatRaw, surahId: number): Ayat {
  return {
    id: parseInt(`${surahId}${raw.nomorAyat.toString().padStart(3, '0')}`),
    chapterId: surahId,
    verseNumber: raw.nomorAyat,
    verseKey: `${surahId}:${raw.nomorAyat}`,
    textArabic: raw.teksArab,
    translationEn: raw.teksIndonesia, // equran.id tidak ada english
  };
}
