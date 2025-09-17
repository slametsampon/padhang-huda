// src/components/layout/app-shell.ts

import { LitElement, html, css } from 'lit';
import './app-header';
import './app-nav';
import './app-main';
import './app-footer';

import { ContextProvider } from '@lit/context';
import { hostApiContext, type HostApiContextValue } from '../../context/tokens';
import type { HostAPI } from '../../context/types';
import { property } from 'lit/decorators.js';

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

  // ✅ Jadikan reactive agar willUpdate terpicu saat di-assign dari luar (test/main.ts)
  @property({ attribute: false }) hostApi!: HostAPI;

  private _provider = new ContextProvider(this, { context: hostApiContext });

  protected willUpdate(changed: Map<string, unknown>) {
    if (changed.has('hostApi')) {
      this._provider.setValue(this.hostApi as HostApiContextValue);
    }
  }

  render() {
    return html`
      <!-- ✅ Forward hostApi eksplisit ke app-nav -->
      <app-nav .hostApi=${this.hostApi}></app-nav>
      <app-header></app-header>
      <div id="outlet"></div>
      <app-footer></app-footer>
    `;
  }

  get outlet() {
    return this.renderRoot.querySelector('#outlet') as HTMLElement | null;
  }
}

customElements.define('app-shell', AppShell);
