// packages/hadith-viewer/src/index.ts

import { LitElement, html, css } from 'lit';
import type { HostContext } from '../../../src/host-context';
import type { PluginHelpers } from '../../../src/plugin-contract';

export default class HadithViewer extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      background: #f0f9ff;
      border: 1px solid #cce7f6;
      border-radius: 8px;
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

export function init(_ctx: HostContext, { registerRoute }: PluginHelpers) {
  console.log('📜 HadithViewer init called');
  registerRoute('/hadith', () => {
    const appShell = document.querySelector('app-shell') as any;
    if (!appShell?.outlet) return;

    appShell.outlet.innerHTML = '';
    appShell.outlet.appendChild(document.createElement('hadith-viewer'));
    console.log('✅ HadithViewer mounted at /hadith');
  });
}
