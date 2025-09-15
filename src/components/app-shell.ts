// src/components/app-shell.ts

import { LitElement, html, css } from 'lit';

export class AppShell extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      padding: 1rem;
    }
  `;

  render() {
    return html`
      <h1>🌟 Padhang Huda</h1>
      <div id="outlet"></div>
    `;
  }

  // 👇 Getter untuk akses outlet dari luar
  get outlet(): HTMLElement | null {
    return this.renderRoot.querySelector('#outlet');
  }
}

customElements.define('app-shell', AppShell);
