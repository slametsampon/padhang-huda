// packages/quran-data/src/repositories/interfaces/AyatRepository.ts

import type { Ayat } from '../../../models/ayat.model';

export interface AyatRepository {
  getBySurat(nomorSurat: number): Promise<Ayat[]>;
  getBySuratAyat(
    nomorSurat: number,
    nomorAyat: number
  ): Promise<Ayat | undefined>;
  getBySuratRange(
    nomorSurat: number,
    from: number,
    to: number
  ): Promise<Ayat[]>;
}
