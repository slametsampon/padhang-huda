// src/components/layout/app-shell.ts

import { LitElement, html, css } from 'lit';
import './app-header';
import './app-nav';
import './app-main';
import './app-footer';
//import './test-clean';
//import './test-component';
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
      <app-nav></app-nav>
      <app-header></app-header>
      <div id="outlet"></div>
      <app-footer></app-footer>
    `;
  }

  get outlet() {
    return this.renderRoot.querySelector('#outlet');
  }
}

customElements.define('app-shell', AppShell);
