// packages/quran-data/src/services/quran.service.ts

import type { Surat, Ayat, Tafsir } from '../../models';

import {
  getSuratRepository,
  getAyatRepository,
  getTafsirRepository,
} from '../repositories/repository-factory';

// Ambil repository instance sesuai mode (mock/api)
const suratRepo = getSuratRepository();
const ayatRepo = getAyatRepository();
const tafsirRepo = getTafsirRepository();

/* ------------------------- SURAT ------------------------- */
export const fetchAllSurat = async (): Promise<Surat[]> => suratRepo.getAll();

export const fetchSuratByNomor = async (
  nomorSurat: number
): Promise<Surat | undefined> => suratRepo.getByNomor(nomorSurat);

/* -------------------------- AYAT ------------------------- */
export const fetchAyatBySurat = async (nomorSurat: number): Promise<Ayat[]> =>
  ayatRepo.getBySurat(nomorSurat);

export const fetchAyatBySuratAyat = async (
  nomorSurat: number,
  nomorAyat: number
): Promise<Ayat | undefined> => ayatRepo.getBySuratAyat(nomorSurat, nomorAyat);

export const fetchAyatBySuratRange = async (
  nomorSurat: number,
  from: number,
  to: number
): Promise<Ayat[]> => ayatRepo.getBySuratRange(nomorSurat, from, to);

/* ------------------------- TAFSIR ------------------------ */
export const fetchTafsirBySurat = async (
  nomorSurat: number
): Promise<Tafsir[]> => tafsirRepo.getBySurat(nomorSurat);

export const fetchTafsirBySuratAyat = async (
  nomorSurat: number,
  nomorAyat: number
): Promise<Tafsir | undefined> =>
  tafsirRepo.getBySuratAyat(nomorSurat, nomorAyat);
