// packages/quran-viewer/src/quran-viewer.ts

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import type { QuranDataProvider } from '../../quran-data/src/quran-contract';

import './components/quran-search-box';
import './components/quran-surah-selector';
import './components/quran-goto';
import './components/quran-search-results';

import './components/layout/quran-left-panel';
import './components/layout/quran-right-panel';

import { viewerStyles } from './styles/quran-viewer.styles';

export class QuranViewer extends LitElement {
  static styles = viewerStyles;

  /** Panel mode: aktif default dan dipantulkan ke atribut (usepanels) */
  @property({ type: Boolean, reflect: true }) usePanels = true;

  @property({ type: Number }) surah = 1;
  @property({ type: Number }) ayah = 1;
  @property({ type: String }) lang = 'id';

  private get _right() {
    return this.shadowRoot?.querySelector('quran-right-panel') as any | null;
  }

  connectedCallback() {
    super.connectedCallback();
    // Sinkron dari event global
    window.addEventListener('quran.goto', this._onGoto as EventListener);
  }

  disconnectedCallback() {
    window.removeEventListener('quran.goto', this._onGoto as EventListener);
    super.disconnectedCallback();
  }

  private _onGoto = (e: Event) => {
    const { surah, ayah } = (e as CustomEvent<{ surah: number; ayah?: number }>)
      .detail;
    if (typeof surah === 'number') this.surah = surah;
    if (typeof ayah === 'number') this.ayah = ayah;
  };

  async loadVerse() {
    await this.updateComplete;
    await this._right?.loadVerse?.();
  }

  setProvider(provider: QuranDataProvider) {
    this._right?.setProvider?.(provider);
    void this.loadVerse();
  }

  render() {
    // ⬇️ Bungkus dengan .layout agar CSS grid aktif
    return html`
      <div class="layout">
        <quran-left-panel>
          <quran-surah-selector .value=${this.surah}></quran-surah-selector>
          <quran-goto></quran-goto>
          <quran-search-box></quran-search-box>
        </quran-left-panel>

        <quran-right-panel
          @quran-goto=${(e: CustomEvent<{ surah: number; ayah: number }>) => {
            this.surah = e.detail.surah;
            this.ayah = e.detail.ayah;
          }}
        ></quran-right-panel>
      </div>
    `;
  }
}

if (!customElements.get('quran-viewer')) {
  customElements.define('quran-viewer', QuranViewer);
}
