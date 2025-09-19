// packages/quran-viewer/src/quran-viewer.ts

import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type {
  QuranVerse,
  QuranDataProvider,
} from '../../quran-data/src/quran-contract';
import { QuranMockProvider } from '../../quran-data/src/quran-mock-provider';
import './components/quran-search-box';
import './components/quran-surah-selector';
import './components/quran-goto';

export class QuranViewer extends LitElement {
  static styles = css`
    @import url('https://fonts.googleapis.com/css2?family=Amiri&display=swap');

    :host {
      display: block;
      padding: 1rem;
      background: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-family: system-ui, sans-serif;
      max-width: 700px;
      margin: auto;
    }
    h2 {
      margin-top: 0;
      font-size: 1.25rem;
      text-align: center;
    }
    .ayah {
      font-family: 'Amiri', serif;
      font-size: 1.75rem;
      margin-bottom: 0.5rem;
      direction: rtl;
      text-align: right;
      line-height: 2.25rem;
    }
    .translation {
      color: #333;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    .not-found {
      color: #900;
      font-style: italic;
      text-align: center;
    }
    .loading {
      text-align: center;
      font-style: italic;
      color: #555;
    }
    .nav-buttons {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      margin-top: 1rem;
    }
    button {
      padding: 0.4rem 0.9rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: #fff;
      cursor: pointer;
      transition: background 0.2s ease;
    }
    button:hover {
      background: #eee;
    }
    .search-results {
      margin-top: 1rem;
    }
    .result {
      padding: 0.5rem;
      border-bottom: 1px solid #ddd;
    }
    .result .ayah {
      font-size: 1.25rem;
    }
    .highlight {
      background: yellow;
      font-weight: bold;
    }
    .result-actions {
      margin-top: 0.3rem;
      text-align: right;
    }
    .result-actions button {
      font-size: 0.8rem;
      padding: 0.2rem 0.5rem;
    }
    @media (max-width: 600px) {
      :host {
        padding: 0.5rem;
      }
      .ayah {
        font-size: 1.5rem;
      }
      .translation {
        font-size: 0.9rem;
      }
    }
  `;

  @property({ type: Number }) surah = 1;
  @property({ type: Number }) ayah = 1;
  @property({ type: String }) lang = 'id';

  private provider: QuranDataProvider = new QuranMockProvider();

  @state() private verse?: QuranVerse;
  @state() private searchResults: QuranVerse[] = [];
  @state() private loading = false;
  @state() private lastQuery = '';

  // === Event Handlers ===
  private _onGoto = (e: Event) => {
    const { surah, ayah } = (e as CustomEvent<{ surah: number; ayah?: number }>)
      .detail;
    if (typeof surah === 'number') this.surah = surah;
    if (typeof ayah === 'number') this.ayah = ayah;
  };

  private _onSearch = (e: Event) => {
    const { query } = (e as CustomEvent<{ query: string }>).detail;
    this.runSearch(query);
  };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('quran.goto', this._onGoto as EventListener);
    window.addEventListener('quran.search', this._onSearch as EventListener);
    this.loadVerse();
  }

  disconnectedCallback() {
    window.removeEventListener('quran.goto', this._onGoto as EventListener);
    window.removeEventListener('quran.search', this._onSearch as EventListener);
    super.disconnectedCallback();
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('surah') || changed.has('ayah') || changed.has('lang')) {
      this.loadVerse();
    }
  }

  async loadVerse() {
    this.loading = true;
    this.verse = await this.provider.getVerse(this.surah, this.ayah);
    this.loading = false;
  }

  private async runSearch(query: string) {
    this.lastQuery = query;
    if (!query) {
      this.searchResults = [];
      return;
    }
    this.loading = true;
    const verses = await this.provider.getAllVerses();
    this.searchResults = verses.filter(
      (v) =>
        this.getTranslation(v, this.lang)
          .toLowerCase()
          .includes(query.toLowerCase()) || v.text.arabic.includes(query)
    );
    this.loading = false;
  }

  private nextAyah() {
    this.ayah++;
  }

  private prevAyah() {
    if (this.ayah > 1) this.ayah--;
  }

  // === Helpers ===
  private getTranslation(v: QuranVerse, lang: string): string {
    const t = (v as any).translations;
    if (!t) return '[Terjemahan tidak tersedia]';

    if (Array.isArray(t)) {
      const found = t.find((tr: any) =>
        tr.language_name?.toLowerCase().startsWith(lang.toLowerCase())
      );
      return found?.text ?? '[Terjemahan tidak tersedia]';
    }
    return t[lang] ?? '[Terjemahan tidak tersedia]';
  }

  private highlight(text: string, query: string) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, `<span class="highlight">$1</span>`);
  }

  private goto(surah: number, ayah: number) {
    this.surah = surah;
    this.ayah = ayah;
    this.searchResults = [];
  }

  private copyVerse(v: QuranVerse) {
    const text = `${v.text.arabic}\n${this.getTranslation(v, this.lang)}`;
    navigator.clipboard.writeText(text);
    alert('✅ Ayat disalin ke clipboard!');
  }

  private copyCurrent = () => {
    if (!this.verse) return;
    const text = `${this.verse.text.arabic}\n${this.getTranslation(
      this.verse,
      this.lang
    )}`;
    navigator.clipboard.writeText(text);
    alert('✅ Ayat disalin ke clipboard!');
  };

  render() {
    return html`
      <!-- NEW: Selector Surah + Goto -->
      <quran-surah-selector .value=${this.surah}></quran-surah-selector>
      <quran-goto></quran-goto>

      <h2>📖 Qur’an Viewer</h2>
      <quran-search-box></quran-search-box>

      ${this.loading
        ? html`<div class="loading">⏳ Loading…</div>`
        : this.searchResults.length > 0
        ? html`
            <div class="search-results">
              ${this.searchResults.map(
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
                      <button @click=${() => this.goto(v.surah, v.ayah)}>
                        👁 View
                      </button>
                      <button @click=${() => this.copyVerse(v)}>📋 Copy</button>
                    </div>
                  </div>
                `
              )}
            </div>
          `
        : this.verse
        ? html`
            <div class="ayah" lang="ar" dir="rtl">
              ${this.verse?.text?.arabic ?? ''}
            </div>
            <div class="translation">
              ${this.getTranslation(this.verse, this.lang)}
            </div>
            <div class="nav-buttons">
              <button @click=${this.prevAyah}>◀️ Prev</button>
              <button @click=${this.copyCurrent}>📋 Copy</button>
              <button @click=${this.nextAyah}>Next ▶️</button>
            </div>
          `
        : html`
            <div class="not-found">
              📭 Ayat ${this.surah}:${this.ayah} tidak ditemukan.
            </div>
          `}
    `;
  }

  setProvider(provider: QuranDataProvider) {
    this.provider = provider;
    this.loadVerse();
  }
}

if (!customElements.get('quran-viewer')) {
  customElements.define('quran-viewer', QuranViewer);
}
