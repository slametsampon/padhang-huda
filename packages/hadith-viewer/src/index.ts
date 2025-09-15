// packages/hadith-viewer/src/index.ts

import { LitElement, html, css } from 'lit';
import type { HostContext } from '../../../src/host-context';

export default class HadithViewer extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      background: #f0f9ff;
      border: 1px solid #cce7f6;
      border-radius: 8px;
      font-family: system-ui, sans-serif;
    }
    h2 {
      margin-top: 0;
      font-size: 1.25rem;
    }
    .arabic {
      font-size: 1.2rem;
      direction: rtl;
      text-align: right;
      margin-bottom: 0.5rem;
    }
    .translation {
      color: #333;
    }
  `;

  render() {
    return html`
      <h2>📜 Hadith Viewer</h2>
      <div class="arabic">إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ</div>
      <div class="translation">Sesungguhnya amal itu tergantung niatnya.</div>
    `;
  }
}

/**
 * Opsional init untuk integrasi non-routing (eventBus, theme, dll.)
 * Tidak lagi mendaftarkan route manual.
 */
export function init(ctx: HostContext) {
  console.log('📜 HadithViewer init dengan host version:', ctx.version);
}
