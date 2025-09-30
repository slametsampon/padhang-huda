// packages/quran-data/src/mappers/equran.surat.mapper.ts

import { Surat } from '../../models/surat.model';

export interface EquranSuratRaw {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: 'Mekah' | 'Madinah';
  arti: string;
  deskripsi?: string;
}

export function mapEquranSurat(raw: EquranSuratRaw): Surat {
  return {
    id: raw.nomor,
    revelationPlace: raw.tempatTurun === 'Mekah' ? 'makka' : 'madina',
    revelationOrder: 0, // equran.id tidak punya data ini
    bismillahPre: true, // fallback
    nameArabic: raw.nama,
    nameSimple: raw.namaLatin,
    nameComplex: raw.namaLatin,
    versesCount: raw.jumlahAyat,
    pagesStart: 0,
    pagesEnd: 0,
    translatedNameEn: raw.arti,
  };
}
