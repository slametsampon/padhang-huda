// packages/quran-viewer/src/components/layout/quran-left-panel.ts

import { LitElement, html, css } from 'lit';

export class QuranLeftPanel extends LitElement {
  static styles = css`
    :host {
      display: block;
      border-right: 1px solid #ddd;
      height: 100%;
      overflow-y: auto;
    }

    header {
      position: sticky;
      top: 0;
      background: white;
      z-index: 10;
      padding: 0.5rem;
      border-bottom: 1px solid #eee;
    }
  `;
  render() {
    return html`<slot></slot>`;
  }
}

if (!customElements.get('quran-left-panel')) {
  customElements.define('quran-left-panel', QuranLeftPanel);
}
