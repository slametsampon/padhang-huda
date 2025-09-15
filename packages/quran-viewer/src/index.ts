// packages/quran-viewer/src/index.ts

import { LitElement, html, css } from 'lit';
import type { HostContext } from '../../../src/host-context';

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
  `;

  render() {
    return html`
      <h2>📖 Qur’an Viewer</h2>
      <div class="ayah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
      <div class="translation">
        Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang
      </div>
    `;
  }
}

/**
 * Opsional init untuk integrasi non-routing (eventBus, theme, dsb.)
 * Tidak lagi melakukan registerRoute manual.
 */
export function init(ctx: HostContext) {
  console.log('📖 QuranViewer init dengan host version:', ctx.version);
}
