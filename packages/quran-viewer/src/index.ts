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

export function init(_ctx: HostContext, { registerRoute }: any) {
  console.log('📖 QuranViewer init called');

  registerRoute('/quran', () => {
    console.log('📌 Route handler /quran executed');

    const appShell = document.querySelector('app-shell') as any;
    if (!appShell) {
      console.warn('⚠️ <app-shell> not found');
      return;
    }

    const outlet = appShell.outlet; // gunakan getter dari app-shell
    if (!outlet) {
      console.warn('⚠️ #outlet not found in app-shell');
      return;
    }

    console.log('🖼️ Rendering <quran-viewer> into #outlet');
    outlet.innerHTML = '';
    outlet.appendChild(document.createElement('quran-viewer'));
  });
}
