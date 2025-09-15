// src/components/layout/app-main.ts

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-main')
export class AppMain extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <main>
        <div id="outlet"></div>
      </main>
    `;
  }

  get outlet() {
    return this.querySelector('#outlet');
  }
}
