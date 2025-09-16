// src/components/layout/app-footer.ts

import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

// @ts-ignore → versi dari define build

@customElement('app-footer')
export class AppFooter extends LitElement {
  static styles = css`
    footer {
      padding: 1rem;
      background: #f8f8f8;
      border-top: 1px solid #e0e0e0;
      font-size: 0.9rem;
      color: #555;
    }

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 960px;
      margin: 0 auto;
    }

    a {
      margin-left: 1rem;
      color: #0077cc;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  `;

  render() {
    return html`
      <footer>
        <div class="container">
          <div>
            © ${new Date().getFullYear()} Taniverse v${'123'}. All rights
            reserved.
          </div>
          <div>
            <a
              href="https://github.com/slametsampon/padhang-huda"
              target="_blank"
              >GitHub</a
            >
            <a href="/about">About</a>
          </div>
        </div>
      </footer>
    `;
  }
}
