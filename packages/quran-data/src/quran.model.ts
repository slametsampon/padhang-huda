// packages/quran-data/src/quran.model.ts

/**
 * ================================
 * Qur’an Data Model — Langkah 1
 * ================================
 * Fondasi kontrak data untuk seluruh plugin (viewer, search, audio, tafsir).
 * Tidak ada implementasi, hanya interface/type.
 * Implementasi (mock, API, DB) baru dibuat di Langkah 2.
 */

/**
 * Representasi 1 ayat (Verse)
 */
export interface QuranVerse {
  surah: number; // Nomor surah (1–114)
  ayah: number; // Nomor ayat dalam surah
  text: {
    arabic: string; // Teks Arab
    uthmani?: string; // Opsional: versi Uthmani
  };
  translations: {
    [lang: string]: string; // Contoh: { "id": "...", "en": "..." }
  };
  meta?: {
    juz?: number;
    page?: number;
    hizb?: number;
  };
}

/**
 * Representasi 1 surah
 */
export interface QuranSurah {
  number: number; // Nomor surah (1–114)
  name: {
    arabic: string; // Nama Arab (الفاتحة)
    transliteration: string; // Al-Fatiha
    translation: { [lang: string]: string }; // { "id": "Pembukaan", "en": "The Opening" }
  };
  revelation: 'Meccan' | 'Madinan';
  ayahs: QuranVerse[];
}

/**
 * Kontrak provider data Qur’an
 * Semua implementasi (mock, JSON offline, API online, DB) harus memenuhi kontrak ini.
 */
export interface QuranDataProvider {
  /**
   * Ambil 1 ayat
   */
  getVerse(surah: number, ayah: number): Promise<QuranVerse | undefined>;

  /**
   * Ambil 1 surah lengkap
   */
  getSurah(surah: number): Promise<QuranSurah | undefined>;

  /**
   * Cari teks/terjemahan
   */
  search(query: string, lang?: string): Promise<QuranVerse[]>;
}
