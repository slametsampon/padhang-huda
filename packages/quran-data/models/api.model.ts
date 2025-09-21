// packages/quran-data/models/api.model.ts

import type { AudioMap } from './surat.model';

/** Bungkus respons API mock: { code, message, data } */
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

/** Bentuk ayat di file mock (raw) */
export interface RawAyat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: AudioMap;
}

/** Payload detail surat di file mock (raw) */
export interface RawSuratPayload {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: 'Mekah' | 'Madinah';
  arti: string;
  deskripsi: string;
  audioFull: AudioMap;
  ayat: RawAyat[];

  /** File mock juga kadang menyertakan properti lain seperti suratSelanjutnya, suratSebelumnya. */
  [extra: string]: unknown;
}

/** Tipe respons untuk surat-{id}.json */
export type SuratResponse = ApiResponse<RawSuratPayload>;
