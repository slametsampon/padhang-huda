// packages/quran-viewer/src/quran-viewer.ts

import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import type {
  QuranVerse,
  QuranDataProvider,
} from '../../quran-data/src/quran-contract';
import { QuranMockProvider } from '../../quran-data/src/quran-mock-provider';

export class QuranViewer extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      background: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-family: system-ui, sans-serif;
    }
    h2 {
      margin-top: 0;
      font-size: 1.25rem;
    }
    .ayah {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      direction: rtl;
      text-align: right;
    }
    .translation {
      color: #333;
      font-size: 1rem;
    }
    .not-found {
      color: #900;
      font-style: italic;
    }
  `;

  /** Surah number (default: 1 / Al-Fatiha) */
  @property({ type: Number }) surah = 1;

  /** Ayah number (default: 1) */
  @property({ type: Number }) ayah = 1;

  /** Language (default: 'id') */
  @property({ type: String }) lang = 'id';

  /** Provider (default: mock) */
  private provider: QuranDataProvider = new QuranMockProvider();

  /** Internal state: resolved verse */
  @state() private verse?: QuranVerse;

  updated(changed: Map<string, unknown>) {
    if (changed.has('surah') || changed.has('ayah') || changed.has('lang')) {
      this.loadVerse();
    }
  }

  async loadVerse() {
    this.verse = await this.provider.getVerse(this.surah, this.ayah);
  }

  render() {
    return html`
      <h2>📖 Qur’an Viewer</h2>
      ${this.verse
        ? html`
            <div class="ayah" lang="ar">${this.verse.text.arabic}</div>
            <div class="translation">
              ${this.verse.translations[this.lang] ??
              '[Terjemahan tidak tersedia]'}
            </div>
          `
        : html`
            <div class="not-found">
              Ayat ${this.surah}:${this.ayah} tidak ditemukan.
            </div>
          `}
    `;
  }

  /** Allow host to override provider */
  setProvider(provider: QuranDataProvider) {
    this.provider = provider;
    this.loadVerse();
  }
}
