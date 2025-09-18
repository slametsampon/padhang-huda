// packages/quran-data/types/quran-api-types.ts

/** Types mirroring Quran.com API v4 */

export interface QuranApiChapter {
  id: number;
  revelation_place: 'makka' | 'madinah';
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: [number, number];
  translated_name: {
    language_name: string;
    name: string;
  };
}

export interface QuranApiChaptersResponse {
  chapters: QuranApiChapter[];
}

export interface QuranApiTranslation {
  id: number;
  language_name: string;
  text: string;
}

export interface QuranApiVerse {
  id: number;
  verse_key: string; // contoh "1:1"
  text_uthmani: string;
  chapter_id: number;
  juz_number: number;
  hizb_number: number;
  rub_el_hizb_number: number;
  sajdah: boolean;
  page_number: number;
  translations: QuranApiTranslation[];
}

export interface QuranApiVersesResponse {
  verses: QuranApiVerse[];
}
