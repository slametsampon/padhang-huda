// packages/quran-viewer/src/components/layout/quran-right-panel.ts

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import type {
  QuranVerse,
  QuranDataProvider,
} from '../../../../quran-data/src/quran-contract';
import { QuranMockProvider } from '../../../../quran-data/src/quran-mock-provider';
import { QuranViewerService } from '../../services/quran-viewer.service';
import { viewerStyles } from '../../styles/quran-viewer.styles';
import '../quran-search-results';

export class QuranRightPanel extends LitElement {
  static styles = viewerStyles;

  // === Props / API ===
  @property({ type: Number }) surah = 1;
  @property({ type: Number }) ayah = 1;
  @property({ type: String }) lang = 'id';

  private provider: QuranDataProvider = new QuranMockProvider();
  private service = new QuranViewerService(this.provider);

  @state() private verse?: QuranVerse;
  @state() private searchResults: QuranVerse[] = [];
  @state() private loading = false;
  @state() private lastQuery = '';

  // === Lifecycle ===
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

  // === Data Fetching ===
  async loadVerse() {
    this.loading = true;
    this.verse = await this.service.getVerse(this.surah, this.ayah);
    this.loading = false;
  }

  private async runSearch(query: string) {
    this.lastQuery = query;
    if (!query) {
      this.searchResults = [];
      return;
    }
    this.loading = true;
    this.searchResults = await this.service.searchVerses(query, this.lang);
    this.loading = false;
  }

  // === Actions ===
  private emitGoto() {
    const detail = { surah: this.surah, ayah: this.ayah };
    // Event bubble ke host (dipakai @quran-goto)
    this.dispatchEvent(
      new CustomEvent('quran-goto', {
        detail,
        bubbles: true,
        composed: true,
      })
    );
    // Event global (kompatibel dengan pola lama `quran.goto`)
    window.dispatchEvent(new CustomEvent('quran.goto', { detail }));
  }

  private nextAyah() {
    this.ayah++;
    this.emitGoto(); // ⬅️ panggil setelah berubah
  }

  private prevAyah() {
    if (this.ayah > 1) this.ayah--;
    this.emitGoto(); // ⬅️ panggil setelah berubah
  }

  private goto = (surah: number, ayah: number) => {
    this.surah = surah;
    this.ayah = ayah;
    this.searchResults = [];
    this.emitGoto(); // ⬅️ panggil setelah berubah
  };

  private copyVerse = (v: QuranVerse) => {
    const text = `${v.text.arabic}\n${this.service.getTranslation(
      v,
      this.lang
    )}`;
    navigator.clipboard.writeText(text);
    alert('✅ Ayat disalin ke clipboard!');
  };

  private copyCurrent = () => {
    if (!this.verse) return;
    const text = `${this.verse.text.arabic}\n${this.service.getTranslation(
      this.verse,
      this.lang
    )}`;
    navigator.clipboard.writeText(text);
    alert('✅ Ayat disalin ke clipboard!');
  };

  // === Public API ===
  setProvider(provider: QuranDataProvider) {
    this.provider = provider;
    this.service = new QuranViewerService(provider);
    this.loadVerse();
  }

  // === Render ===
  render() {
    if (this.loading) {
      return html`<div class="loading">⏳ Loading…</div>`;
    }

    if (this.searchResults.length > 0) {
      return html`
        <quran-search-results
          .results=${this.searchResults}
          .lang=${this.lang}
          .lastQuery=${this.lastQuery}
          .onGoto=${this.goto}
          .onCopyVerse=${this.copyVerse}
          .getTranslation=${(v: QuranVerse, lang: string) =>
            this.service.getTranslation(v, lang)}
          .highlight=${(t: string, q: string) => this.service.highlight(t, q)}
        ></quran-search-results>
      `;
    }

    if (this.verse) {
      return html`
        <div class="ayah" lang="ar" dir="rtl">
          ${this.verse?.text?.arabic ?? ''}
        </div>
        <div class="translation">
          ${this.service.getTranslation(this.verse, this.lang)}
        </div>
        <div class="nav-buttons">
          <button @click=${this.prevAyah}>◀️ Prev</button>
          <button @click=${this.copyCurrent}>📋 Copy</button>
          <button @click=${this.nextAyah}>Next ▶️</button>
        </div>
      `;
    }

    return html`
      <div class="not-found">
        📭 Ayat ${this.surah}:${this.ayah} tidak ditemukan.
      </div>
    `;
  }
}

if (!customElements.get('quran-right-panel')) {
  customElements.define('quran-right-panel', QuranRightPanel);
}
