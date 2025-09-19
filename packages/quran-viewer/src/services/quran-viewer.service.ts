// packages/quran-viewer/src/services/quran-viewer.service.ts

import type {
  QuranVerse,
  QuranDataProvider,
} from '../../../quran-data/src/quran-contract';

export class QuranViewerService {
  private provider: QuranDataProvider;

  constructor(provider: QuranDataProvider) {
    this.provider = provider;
  }

  async getVerse(surah: number, ayah: number): Promise<QuranVerse | undefined> {
    return this.provider.getVerse(surah, ayah);
  }

  /**
   * Pencarian default (anti-break):
   * - Cocokkan query pada terjemahan (case-insensitive)
   * - ATAU cocokkan pada teks Arab (includes)
   */
  async searchVerses(query: string, lang: string): Promise<QuranVerse[]> {
    const q = (query ?? '').trim();
    if (!q) return [];
    const verses = await this.provider.getAllVerses();
    const lower = q.toLowerCase();

    return verses.filter((v) => {
      const trans = this.getTranslation(v, lang).toLowerCase();
      return trans.includes(lower) || (v.text?.arabic ?? '').includes(q);
    });
  }

  /**
   * Mengambil terjemahan dari struktur array/map (sesuai kode awal).
   * Fallback: "[Terjemahan tidak tersedia]".
   */
  getTranslation(v: QuranVerse, lang: string): string {
    const t: any = (v as any).translations;
    if (!t) return '[Terjemahan tidak tersedia]';

    if (Array.isArray(t)) {
      const found = t.find((tr: any) =>
        tr.language_name?.toLowerCase().startsWith((lang ?? '').toLowerCase())
      );
      return found?.text ?? '[Terjemahan tidak tersedia]';
    }
    return t?.[lang] ?? '[Terjemahan tidak tersedia]';
  }

  /**
   * Highlight query dalam text; aman terhadap karakter regex khusus.
   * Perilaku visual sama (span.highlight) seperti sebelumnya.
   */
  highlight(text: string, query: string): string {
    if (!query) return text;
    const safe = this.escapeRegExp(query);
    const regex = new RegExp(`(${safe})`, 'gi');
    return (text ?? '').replace(regex, '<span class="highlight">$1</span>');
  }

  private escapeRegExp(input: string): string {
    // Escapes: . * + ? ^ $ { } ( ) | [ ] \ /
    return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}
