// src/components/views/not-found-view.ts

import { LitElement, html, css } from 'lit';

export class NotFoundView extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
      text-align: center;
      color: #666;
      font-family: system-ui, sans-serif;
    }
    h2 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    a {
      color: #0366d6;
      text-decoration: none;
      font-weight: 500;
    }
    a:hover {
      text-decoration: underline;
    }
  `;

  render() {
    return html`
      <h2>404 - Halaman tidak ditemukan</h2>
      <p>Kembali ke <a href="/quran">Halaman Utama</a></p>
    `;
  }
}

customElements.define('not-found-view', NotFoundView);
