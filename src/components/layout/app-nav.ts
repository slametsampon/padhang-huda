// src/components/layout/app-nav.ts

import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { HostContext } from '../../host-context';

@customElement('app-nav')
export class AppNav extends LitElement {
  items = HostContext.nav.getAll();

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('popstate', this._onRouteChange);
    HostContext.nav.addEventListener('change', this._onNavChange);
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this._onRouteChange);
    HostContext.nav.removeEventListener('change', this._onNavChange);
    super.disconnectedCallback();
  }

  private _onRouteChange = () => this.requestUpdate();

  private _onNavChange = () => {
    this.items = HostContext.nav.getAll();
    this.requestUpdate();
  };

  static styles = css`
    nav {
      display: flex;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    a {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      background-color: #f3f4f6;
      color: #374151;
      font-weight: 500;
      text-decoration: none;
      transition: background-color 0.2s, color 0.2s;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    a:hover {
      background-color: #e0f2fe;
      color: #0369a1;
    }

    a[aria-current='page'] {
      background-color: #0ea5e9;
      color: white;
    }
  `;

  render() {
    return html`
      <nav>
        ${this.items.map(
          (item) => html`
            <a
              href=${item.path}
              aria-current=${ifDefined(
                location.pathname === item.path ? 'page' : undefined
              )}
            >
              ${item.icon ?? ''} ${item.label}
            </a>
          `
        )}
      </nav>
    `;
  }
}
