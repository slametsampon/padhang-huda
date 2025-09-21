// packages/quran-data/models/ayat.model.ts

import { AudioMap } from './surat.model';

export interface Ayat {
  nomorSurat: number; // referensi surat
  nomorAyat: number; // dalam surat
  nomorJuz: number; // navigasi juz
  nomorHalaman: number; // navigasi mushaf
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: AudioMap;
}
