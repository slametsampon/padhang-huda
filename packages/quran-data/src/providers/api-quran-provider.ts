// packages/quran-data/src/providers/api-quran-provider.ts

import type {
  QuranDataProvider,
  QuranVerse,
  QuranSurah,
} from '../quran-contract';

type FetchLike = (
  input: RequestInfo | URL,
  init?: RequestInit
) => Promise<Response>;

export interface ApiQuranProviderOptions {
  baseUrl: string;
  timeoutMs?: number;
  fetchFn?: FetchLike;
}

/**
 * Adapter API → kontrak local.
 * Endpoint disesuaikan dengan backend Anda. Di sini gunakan contoh generic:
 *  - GET /verse?surah=1&ayah=1
 *  - GET /surah/1
 *  - GET /search?q=...&lang=id
 */
export class ApiQuranProvider implements QuranDataProvider {
  private baseUrl: string;
  private timeoutMs: number;
  private fetchFn: FetchLike;

  constructor(opts: ApiQuranProviderOptions) {
    this.baseUrl = opts.baseUrl.replace(/\/+$/, '');
    this.timeoutMs = opts.timeoutMs ?? 8000;
    this.fetchFn = opts.fetchFn ?? fetch;
  }

  private async _getJSON<T>(url: string): Promise<T> {
    const ctl = new AbortController();
    const tid = setTimeout(() => ctl.abort(), this.timeoutMs);
    try {
      const res = await this.fetchFn(url, { signal: ctl.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as T;
    } finally {
      clearTimeout(tid);
    }
  }

  async getVerse(surah: number, ayah: number): Promise<QuranVerse | undefined> {
    type ApiVerse = {
      surah: number;
      ayah: number;
      text_ar: string;
      text_uth?: string;
      tr_id?: string;
      tr_en?: string;
      juz?: number;
      page?: number;
    };
    const data = await this._getJSON<ApiVerse>(
      `${this.baseUrl}/verse?surah=${surah}&ayah=${ayah}`
    );
    return {
      surah: data.surah,
      ayah: data.ayah,
      text: { arabic: data.text_ar, uthmani: data.text_uth },
      translations: { id: data.tr_id ?? '', en: data.tr_en ?? '' },
      meta: { juz: data.juz, page: data.page },
    };
  }

  async getSurah(surah: number): Promise<QuranSurah | undefined> {
    type ApiSurah = {
      number: number;
      name_ar: string;
      name_en: string;
      translit: string;
      revelation: 'Meccan' | 'Madinan';
      ayahs: Array<{
        surah: number;
        ayah: number;
        text_ar: string;
        tr_id?: string;
        tr_en?: string;
        juz?: number;
        page?: number;
      }>;
    };
    const s = await this._getJSON<ApiSurah>(`${this.baseUrl}/surah/${surah}`);
    return {
      number: s.number,
      name: {
        arabic: s.name_ar,
        transliteration: s.translit,
        translation: { en: s.name_en }, // tambahkan {id: ...} jika backend punya
      },
      revelation: s.revelation,
      ayahs: s.ayahs.map((v) => ({
        surah: v.surah,
        ayah: v.ayah,
        text: { arabic: v.text_ar },
        translations: { id: v.tr_id ?? '', en: v.tr_en ?? '' },
        meta: { juz: v.juz, page: v.page },
      })),
    };
  }

  async search(query: string, lang = 'id'): Promise<QuranVerse[]> {
    type ApiSearchItem = {
      surah: number;
      ayah: number;
      text_ar: string;
      tr?: string;
      juz?: number;
      page?: number;
    };
    const list = await this._getJSON<ApiSearchItem[]>(
      `${this.baseUrl}/search?q=${encodeURIComponent(query)}&lang=${lang}`
    );
    return list.map((v) => ({
      surah: v.surah,
      ayah: v.ayah,
      text: { arabic: v.text_ar },
      translations: { [lang]: v.tr ?? '' },
      meta: { juz: v.juz, page: v.page },
    }));
  }

  async getAllVerses(): Promise<QuranVerse[]> {
    // 🚨 Belum ada endpoint resmi → sementara kita fallback:
    // ambil semua surah via getSurah() lalu gabungkan ayatnya.
    // Hati-hati kalau API Anda besar → bisa berat.
    const verses: QuranVerse[] = [];
    // misalnya kita asumsikan backend punya 114 surah
    for (let i = 1; i <= 114; i++) {
      try {
        const surah = await this.getSurah(i);
        if (surah?.ayahs) {
          verses.push(...surah.ayahs);
        }
      } catch {
        // abaikan surah yg gagal
      }
    }
    return verses;
  }
}
