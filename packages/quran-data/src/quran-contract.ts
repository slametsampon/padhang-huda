// packages/quran-data/src/quran-contract.ts

/**
 * Qur’an Data Contract — Langkah 1
 * Fondasi kontrak data untuk seluruh plugin (viewer, search, audio, tafsir).
 */

/**
 * Representasi 1 terjemahan ayat
 */
export interface QuranTranslation {
  id: number;
  language_name: string;
  text: string;
}

/** Representasi 1 ayat (Verse) */
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
    rubElHizb?: number; // ✅ tambahkan ini
    sajdah?: boolean; // ✅ juga dari API
  };
}

/** Representasi 1 surah */
export interface QuranSurah {
  number: number;
  name: {
    arabic: string;
    transliteration: string;
    translation: { [lang: string]: string };
  };
  revelation: 'Meccan' | 'Madinan';
  ayahs?: QuranVerse[];
}

/** Kontrak provider data Qur’an */

export interface QuranDataProvider {
  getVerse(surah: number, ayah: number): Promise<QuranVerse | undefined>;
  getSurah(surah: number): Promise<QuranSurah | undefined>;

  /** Search verses by text or translation */
  search(query: string, lang?: string): Promise<QuranVerse[]>;

  /** Ambil semua ayat (untuk keperluan search box) */
  getAllVerses(): Promise<QuranVerse[]>;
}
