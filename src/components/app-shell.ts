// src/components/app-shell.ts

import { LitElement, html, css } from 'lit';

export class AppShell extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: system-ui, sans-serif;
      padding: 1rem;
    }
    nav a {
      margin-right: 1rem;
      text-decoration: none;
      color: #0366d6;
      font-weight: 500;
    }
    nav a:hover {
      text-decoration: underline;
    }
  `;

  render() {
    return html`
      <h1>🌟 Padhang Huda</h1>
      <nav>
        <a href="/quran" @click=${this.navigate}>Qur’an</a>
        <a href="/hadith" @click=${this.navigate}>Hadith</a>
      </nav>
      <div id="outlet"></div>
    `;
  }

  get outlet() {
    return this.renderRoot.querySelector('#outlet');
  }

  private navigate(e: Event) {
    e.preventDefault();
    const target = e.currentTarget as HTMLAnchorElement;
    if (target?.href) {
      window.history.pushState({}, '', target.pathname);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }
}

customElements.define('app-shell', AppShell);
