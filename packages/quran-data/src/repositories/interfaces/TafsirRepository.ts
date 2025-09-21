// packages/quran-data/src/repositories/interfaces/TafsirRepository.ts

import type { Tafsir } from '../../../models';

export interface TafsirRepository {
  getBySurat(nomorSurat: number): Promise<Tafsir[]>;
  getBySuratAyat(
    nomorSurat: number,
    nomorAyat: number
  ): Promise<Tafsir | undefined>;
}
