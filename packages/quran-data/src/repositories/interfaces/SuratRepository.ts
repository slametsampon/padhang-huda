// packages/quran-data/src/repositories/interfaces/SuratRepository.ts

import type { Surat } from '../../../models/surat.model';

export interface SuratRepository {
  getAll(): Promise<Surat[]>;
  getByNomor(nomorSurat: number): Promise<Surat | undefined>;
}
