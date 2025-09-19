// packages/quran-viewer/src/components/quran-search-results.ts
import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { QuranVerse } from '../../../quran-data/src/quran-contract';

export class QuranSearchResults extends LitElement {
  static styles = css`
    /* minimal style agar highlight selalu terlihat di shadow DOM anak */
    mark,
    .highlight {
      background: var(--qv-highlight-bg, yellow);
      color: inherit;
      font-weight: var(--qv-highlight-weight, 700);
      padding: 0 2px;
      border-radius: 2px;
    }
  `;

  @property({ type: Array }) results: QuranVerse[] = [];
  @property({ type: String }) lang = 'id';
  @property({ type: String }) lastQuery = '';

  @property({ attribute: false }) gotoFn?: (s: number, a: number) => void;
  @property({ attribute: false }) copyFn?: (v: QuranVerse) => void;

  @property({ attribute: false }) getTranslation?: (
    v: QuranVerse,
    lang: string
  ) => string;
  @property({ attribute: false }) highlight?: (
    text: string,
    query: string
  ) => string;

  private defaultTranslation(v: QuranVerse, lang: string): string {
    return v.translations?.[lang] ?? '';
  }

  // gunakan <mark> agar tetap terlihat walau CSS host tidak masuk
  private defaultHighlight(text: string, query: string): string {
    if (!query) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // escape regex chars
    const re = new RegExp(`(${escaped})`, 'gi');
    return text.replace(re, `<mark class="highlight">$1</mark>`);
  }

  render() {
    const getTr = this.getTranslation ?? this.defaultTranslation;
    const hi = this.highlight ?? this.defaultHighlight;

    return html`
      <div class="search-results">
        ${this.results.map(
          (v) => html`
            <div class="result">
              <div><strong>${v.surah}:${v.ayah}</strong></div>
              <div class="ayah" lang="ar" dir="rtl">${v.text.arabic}</div>
              <div class="translation">
                ${unsafeHTML(hi(getTr(v, this.lang), this.lastQuery.trim()))}
              </div>
              <div class="result-actions">
                <button @click=${() => this.gotoFn?.(v.surah, v.ayah)}>
                  👁 View
                </button>
                <button @click=${() => this.copyFn?.(v)}>📋 Copy</button>
              </div>
            </div>
          `
        )}
      </div>
    `;
  }
}

if (!customElements.get('quran-search-results')) {
  customElements.define('quran-search-results', QuranSearchResults);
}
