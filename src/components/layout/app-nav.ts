// src/components/layout/app-nav.ts

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-nav')
export class AppNav extends LitElement {
  createRenderRoot() {
    return this; // light DOM
  }

  render() {
    return html`
      <nav>
        <a href="/quran">Qur’an</a>
        <a href="/hadith">Hadith</a>
      </nav>
    `;
  }
}
