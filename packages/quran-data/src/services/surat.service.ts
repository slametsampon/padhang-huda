// packages/quran-data/src/services/surat.service.ts

import { getSuratRepository } from '../repositories/repository-factory';
import type { Surat } from '../../models/surat.model';

const repo = getSuratRepository();

export const fetchAllSurat = (): Promise<Surat[]> => repo.getAll();
export const fetchSuratByNomor = (nomor: number): Promise<Surat | undefined> =>
  repo.getByNomor(nomor);
