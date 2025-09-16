// src/components/layout/app-shell.ts
import { LitElement, html, css } from 'lit';
import './app-header';
import './app-nav';
import './app-main';
import './app-footer';

import { ContextProvider } from '@lit/context';
import { hostApiContext, type HostApiContextValue } from '../../context/tokens';
import type { HostAPI } from '../../context/types';

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

  // Properti ini sudah Anda pakai di main.ts
  // (biarkan HostAPI apa adanya; casting dilakukan saat setValue)
  hostApi!: HostAPI;

  // ✅ Pakai signature baru: options object { context, initialValue? }
  // (tanpa generic manual agar inference aman)
  private _provider = new ContextProvider(this, { context: hostApiContext });

  protected willUpdate(changed: Map<string, unknown>) {
    if (changed.has('hostApi')) {
      // Casting sekali di sini untuk memenuhi HostApiContextValue
      this._provider.setValue(this.hostApi as HostApiContextValue);
    }
  }

  render() {
    return html`
      <app-nav></app-nav>
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
