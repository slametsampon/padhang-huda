// packages/quran-data/models/tafsir.ts

export interface Tafsir {
  nomorSurat: number; // referensi surat
  ayat: number; // nomor ayat dalam surat
  nomorJuz?: number; // opsional: untuk query per juz
  nomorHalaman?: number; // opsional: untuk mushaf view
  sumber?: string; // contoh: "Ibnu Katsir"
  teks: string;
  teksRingkas?: string;
}
