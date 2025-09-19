// packages/quran-viewer/src/components/quran-search-results.ts

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { QuranVerse } from '../../../quran-data/src/quran-contract';

export class QuranSearchResults extends LitElement {
  @property({ type: Array }) results: QuranVerse[] = [];
  @property({ type: String }) lang = 'id';
  @property({ type: String }) lastQuery = '';

  // Callbacks dari host
  @property({ attribute: false }) onGoto!: (s: number, a: number) => void;
  @property({ attribute: false }) onCopy!: (v: QuranVerse) => void;
  @property({ attribute: false }) getTranslation!: (
    v: QuranVerse,
    lang: string
  ) => string;
  @property({ attribute: false }) highlight!: (
    text: string,
    query: string
  ) => string;

  render() {
    return html`
      <div class="search-results">
        ${this.results.map(
          (v) => html`
            <div class="result">
              <div><strong>${v.surah}:${v.ayah}</strong></div>
              <div class="ayah" lang="ar" dir="rtl">${v.text.arabic}</div>
              <div class="translation">
                ${unsafeHTML(
                  this.highlight(
                    this.getTranslation(v, this.lang),
                    this.lastQuery
                  )
                )}
              </div>
              <div class="result-actions">
                <button @click=${() => this.onGoto(v.surah, v.ayah)}>
                  👁 View
                </button>
                <button @click=${() => this.onCopy(v)}>📋 Copy</button>
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
