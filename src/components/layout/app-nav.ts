// src/components/layout/app-nav.ts

import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { HostContext } from '../../host-context';
import type { NavItem, NavStore, HostAPI } from '../../context/types';

@customElement('app-nav')
export class AppNav extends LitElement {
  /**
   * Di-inject oleh <app-shell>. Jika tidak ada, fallback ke HostContext.nav.
   */
  @property({ attribute: false }) hostApi?: HostAPI;

  /** Cache items untuk render */
  @state()
  private items: NavItem[] = [];

  /** Store aktif yang sedang digunakan (untuk detach listener saat berganti) */
  private _activeNav?: NavStore & EventTarget;

  // --- lifecycle ---

  protected firstUpdated() {
    this.attachToCurrentStore();
  }

  protected updated(changed: PropertyValues) {
    if (changed.has('hostApi')) {
      this.attachToCurrentStore();
    }
  }

  disconnectedCallback(): void {
    this.detachFromStore();
    super.disconnectedCallback();
  }

  // --- store wiring ---

  private get resolvedNav(): NavStore & EventTarget {
    return (this.hostApi?.nav ?? HostContext.nav) as unknown as NavStore &
      EventTarget;
  }

  private detachFromStore() {
    if (this._activeNav) {
      this._activeNav.removeEventListener('change', this._onNavChange);
      this._activeNav = undefined;
    }
  }

  private attachToCurrentStore() {
    const next = this.resolvedNav;
    if (this._activeNav === next) return;

    this.detachFromStore();
    this._activeNav = next;
    this.items = next.getAll();
    next.addEventListener('change', this._onNavChange);

    console.log('📌 Attached to NavStore, initial items:', this.items);
  }

  private _onNavChange = () => {
    this.items = this.resolvedNav.getAll();
    console.log('🔄 Nav items updated:', this.items);
  };

  // --- styles & render ---

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
