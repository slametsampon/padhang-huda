// packages/quran-data/src/services/ayat.service.ts

import { MockAyatRepository } from '../repositories/mock/MockAyatRepository';

const repo = new MockAyatRepository();

export const fetchAyatBySurat = (suratNomor: number) =>
  repo.getBySurat(suratNomor);
export const fetchAyatBySuratAyat = (suratNomor: number, ayatNomor: number) =>
  repo.getBySuratAyat(suratNomor, ayatNomor);
export const fetchAyatBySuratRange = (
  suratNomor: number,
  from: number,
  to: number
) => repo.getBySuratRange(suratNomor, from, to);
