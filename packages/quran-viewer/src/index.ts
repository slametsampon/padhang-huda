// packages/quran-viewer/src/index.ts

import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { HostContext } from '../../../src/host-context';

// Mock dataset kecil untuk demo (Fatiha + Baqarah:1)
const DATA: Record<
  number,
  Record<number, { arabic: string; translation: string }>
> = {
  1: {
    1: {
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      translation: 'Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang',
    },
    2: {
      arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      translation: 'Segala puji bagi Allah, Tuhan semesta alam',
    },
  },
  2: {
    1: {
      arabic: 'الم',
      translation: 'Alif, Lam, Mim',
    },
  },
};

export default class QuranViewer extends LitElement {
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

  /** Internal state: resolved text */
  @state() private verse?: { arabic: string; translation: string };

  updated(changed: Map<string, unknown>) {
    if (changed.has('surah') || changed.has('ayah')) {
      this.verse = DATA[this.surah]?.[this.ayah];
    }
  }

  render() {
    return html`
      <h2>📖 Qur’an Viewer</h2>
      ${this.verse
        ? html`
            <div class="ayah" lang="ar">${this.verse.arabic}</div>
            <div class="translation">${this.verse.translation}</div>
          `
        : html`
            <div class="not-found">
              Ayat ${this.surah}:${this.ayah} tidak ditemukan dalam dataset
              demo.
            </div>
          `}
    `;
  }
}

/**
 * Opsional init untuk integrasi non-routing (eventBus, theme, dsb.)
 */
export function init(ctx: HostContext) {
  console.log('📖 QuranViewer init dengan host version:', ctx.version);
}
