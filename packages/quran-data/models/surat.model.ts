// packages/quran-data/models/surat.model.ts

// packages/quran-data/models/surat.ts

export interface AudioMap {
  [key: string]: string; // contoh: "01": "https://cdn.equran.id/audio-full/Abdullah-Al-Juhany/001.mp3"
}

export interface Surat {
  nomor: number; // unik (1–114)
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: 'Mekah' | 'Madinah';
  arti: string;
  deskripsi: string;
  audioFull: AudioMap;

  // navigasi
  nomorJuzAwal: number; // juz tempat surat dimulai
  nomorHalamanAwal: number;
  nomorJuzAkhir: number; // juz tempat surat berakhir
  nomorHalamanAkhir: number;
}
