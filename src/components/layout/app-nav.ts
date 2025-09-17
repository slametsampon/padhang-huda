// src/components/layout/app-nav.ts

import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { HostContext } from '../../host-context';
import type { NavItem, NavStore, HostAPI } from '../../context/types';

@customElement('app-nav')
export class AppNav extends LitElement {
  /** Di-inject oleh <app-shell>. */
  @property({ attribute: false }) hostApi?: HostAPI;

  /** Reactive state untuk daftar item nav. */
  @state() private items: NavItem[] = [];

  /** Store aktif (agar bisa detach listener saat berganti). */
  private _activeNav?: (NavStore & EventTarget) | null = null;

  // ===== lifecycle =====

  connectedCallback(): void {
    super.connectedCallback();
    // Attach awal ke store default (HostContext) — sebelum render pertama
    this.attachToStore(this.resolvedNav);
    // Dengarkan perubahan route untuk highlight link aktif
    window.addEventListener('popstate', this._onRouteChange);
  }

  disconnectedCallback(): void {
    window.removeEventListener('popstate', this._onRouteChange);
    this.detachFromStore();
    super.disconnectedCallback();
  }

  /** Re-attach saat hostApi berubah — masih dalam siklus update → tidak ada warning. */
  protected willUpdate(changed: PropertyValues) {
    if (changed.has('hostApi')) {
      this.attachToStore(this.resolvedNav);
    }
  }

  // ===== wiring store =====

  private get resolvedNav(): NavStore & EventTarget {
    return (this.hostApi?.nav ?? HostContext.nav) as NavStore & EventTarget;
  }

  private _onStoreChange = () => {
    // Cukup set @state — Lit akan re-render tanpa requestUpdate()
    this.items = this.resolvedNav.getAll();
  };

  private attachToStore(next: NavStore & EventTarget) {
    if (this._activeNav === next) return;
    this.detachFromStore();
    this._activeNav = next;
    this.items = next.getAll(); // set awal sebelum render
    next.addEventListener('change', this._onStoreChange);
  }

  private detachFromStore() {
    if (!this._activeNav) return;
    this._activeNav.removeEventListener('change', this._onStoreChange);
    this._activeNav = null;
  }

  private _onRouteChange = () => {
    // Perubahan URL hanya mempengaruhi aria-current; cukup minta re-render ringan
    this.requestUpdate();
  };

  // ===== styles & render =====

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
              ${item.icon ? html`<span class="icon">${item.icon}</span>` : ''}
              <span class="label">${item.label}</span>
            </a>
          `
        )}
      </nav>
    `;
  }
}
