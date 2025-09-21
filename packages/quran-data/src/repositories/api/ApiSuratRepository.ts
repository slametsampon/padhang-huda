// packages/quran-data/src/repositories/api/ApiSuratRepository.ts

import { SuratRepository } from '../interfaces/SuratRepository';
import type { Surat } from '../../../models/surat.model';
import type { ApiResponse } from '../../../models/api.model';

export class ApiSuratRepository implements SuratRepository {
  private baseUrl = 'https://api.example.com';

  async getAll(): Promise<Surat[]> {
    const res = await fetch(`${this.baseUrl}/surat`);
    if (!res.ok) {
      throw new Error(`[ApiSuratRepository] Gagal fetch daftar surat`);
    }

    const data: ApiResponse<Surat[]> = await res.json();
    return data.data ?? [];
  }

  async getByNomor(nomorSurat: number): Promise<Surat | undefined> {
    const res = await fetch(`${this.baseUrl}/surat/${nomorSurat}`);
    if (!res.ok) {
      throw new Error(`[ApiSuratRepository] Gagal fetch surat ${nomorSurat}`);
    }

    const data: ApiResponse<Surat> = await res.json();
    return data.data ?? undefined;
  }
}
