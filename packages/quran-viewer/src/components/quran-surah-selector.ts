// packages/quran-viewer/src/components/quran-surah-selector.ts

import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';

type ChapterItem = {
  id: number;
  name_simple: string;
  name_arabic: string;
  verses_count: number;
};

export class QuranSurahSelector extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-bottom: 0.5rem;
    }
    .row {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    select {
      padding: 0.35rem 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: #fff;
    }
    label {
      font-size: 0.9rem;
      color: #444;
    }
  `;

  /** surah aktif dari host */
  @property({ type: Number }) value = 1;

  @state() private chapters: ChapterItem[] = [];
  @state() private loading = false;

  connectedCallback() {
    super.connectedCallback();
    this.loadChapters();
  }

  private async loadChapters() {
    this.loading = true;
    try {
      const res = await fetch('/quran-data/chapters.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      this.chapters = (data?.chapters ?? []).map((c: any) => ({
        id: c.id,
        name_simple: c.name_simple,
        name_arabic: c.name_arabic,
        verses_count: c.verses_count,
      }));
      if (!Array.isArray(this.chapters) || this.chapters.length === 0) {
        throw new Error('Empty chapters');
      }
    } catch (e) {
      console.warn('[SurahSelector] fallback minimal list:', e);
      this.chapters = [
        {
          id: 1,
          name_simple: 'Al-Fatihah',
          name_arabic: 'الفاتحة',
          verses_count: 7,
        },
      ];
    } finally {
      this.loading = false;
    }
  }

  private onChange(e: Event) {
    const surah = Number((e.target as HTMLSelectElement).value);
    // Emit ke window agar kompatibel dengan listener yang sudah ada
    window.dispatchEvent(
      new CustomEvent('quran.goto', { detail: { surah, ayah: 1 } })
    );
  }

  render() {
    return html`
      <div class="row">
        <label for="surahSel">Surah:</label>
        <select
          id="surahSel"
          @change=${this.onChange}
          .value=${String(this.value)}
        >
          ${this.chapters.map(
            (c) =>
              html`<option value=${c.id}>
                ${c.id}. ${c.name_simple} — ${c.name_arabic}
              </option>`
          )}
        </select>
        ${this.loading ? html`<span>⏳</span>` : null}
      </div>
    `;
  }
}

if (!customElements.get('quran-surah-selector')) {
  customElements.define('quran-surah-selector', QuranSurahSelector);
}
