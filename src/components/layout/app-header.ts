// src/components/layout/app-header.ts

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-header')
export class AppHeader extends LitElement {
  createRenderRoot() {
    return this; // light DOM agar mudah pakai global CSS
  }

  render() {
    return html`
      <header>
        <h1>🌟 Padhang Huda</h1>
      </header>
    `;
  }
}
