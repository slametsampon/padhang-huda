// src/components/layout/app-footer.ts

import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

// dari vite.config.ts
declare const __APP_VERSION__: string;

@customElement('app-footer')
export class AppFooter extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%; /* ✅ pastikan custom element penuh */
      background: #f9fafb;
      border-top: 1px solid #e5e7eb;
      position: fixed;
      bottom: 0;
      left: 0; /* ✅ tambah */
      right: 0; /* ✅ tambah */
    }

    footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%; /* ✅ isi ikut penuh */
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      color: #374151;
      box-sizing: border-box; /* ✅ padding dihitung di width 100% */
    }

    .links {
      display: flex;
      gap: 1rem;
    }

    a {
      color: #0366d6;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  `;

  render() {
    return html`
      <footer>
        <div>
          © ${new Date().getFullYear()} Taniverse v${__APP_VERSION__}. All
          rights reserved.
        </div>
        <div class="links">
          <a href="https://github.com/slametsampon/padhang-huda" target="_blank"
            >GitHub</a
          >
          <a href="/about">About</a>
        </div>
      </footer>
    `;
  }
}
