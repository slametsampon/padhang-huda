// packages/quran-data/src/services/tafsir.service.ts

import { MockTafsirRepository } from '../repositories/mock/MockTafsirRepository';

const repo = new MockTafsirRepository();

export const fetchTafsirBySurat = (suratNomor: number) =>
  repo.getBySurat(suratNomor);

export const fetchTafsirBySuratAyat = (suratNomor: number, ayatNomor: number) =>
  repo.getBySuratAyat(suratNomor, ayatNomor);
