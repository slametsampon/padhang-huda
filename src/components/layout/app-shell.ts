// src/components/layout/app-shell.ts
import { LitElement, html, css } from 'lit';
import './app-header';
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
  `;

  // ✅ Reactive, agar willUpdate terpanggil ketika di-assign dari luar
  @property({ attribute: false }) hostApi!: HostAPI;

  private _provider = new ContextProvider(this, { context: hostApiContext });

  protected willUpdate(changed: Map<string, unknown>) {
    if (changed.has('hostApi')) {
      this._provider.setValue(this.hostApi as HostApiContextValue);
    }
  }

  render() {
    return html`
      <app-header .hostApi=${this.hostApi}></app-header>
      <div id="outlet"></div>
      <app-footer></app-footer>
    `;
  }

  get outlet() {
    return this.renderRoot.querySelector('#outlet') as HTMLElement | null;
  }
}

customElements.define('app-shell', AppShell);
