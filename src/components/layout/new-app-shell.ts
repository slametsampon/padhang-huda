// src/components/layout/app-shell.ts

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

// Import bagian layout
import './app-header';
import './app-nav';
import './app-main';
import './app-footer';

@customElement('app-shell')
export class AppShell extends LitElement {
  createRenderRoot() {
    return this; // pakai Light DOM agar CSS global tetap berlaku
  }

  render() {
    return html`
      <app-header></app-header>
      <app-nav></app-nav>
      <app-main></app-main>
      <app-footer></app-footer>
    `;
  }

  get outlet() {
    return this.querySelector('app-main')?.querySelector('#outlet');
  }
}
