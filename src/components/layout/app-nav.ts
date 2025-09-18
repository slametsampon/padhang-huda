// src/components/layout/app-nav.ts
import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { HostContext } from '../../host-context';
import type { NavItem, NavStore, HostAPI } from '../../context/types';

@customElement('app-nav')
export class AppNav extends LitElement {
  @property({ attribute: false }) hostApi?: HostAPI;
  @state() private items: NavItem[] = [];
  @state() private menuOpen = false;

  private _activeNav?: (NavStore & EventTarget) | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    this.attachToStore(this.resolvedNav);
    window.addEventListener('popstate', this._onRouteChange);
    window.addEventListener('click', this._onOutsideClick);
  }

  disconnectedCallback(): void {
    window.removeEventListener('popstate', this._onRouteChange);
    window.removeEventListener('click', this._onOutsideClick);
    this.detachFromStore();
    super.disconnectedCallback();
  }

  protected willUpdate(changed: PropertyValues) {
    if (changed.has('hostApi')) {
      this.attachToStore(this.resolvedNav);
    }
  }

  private get resolvedNav(): NavStore & EventTarget {
    return (this.hostApi?.nav ?? HostContext.nav) as NavStore & EventTarget;
  }

  private _onStoreChange = () => {
    this.items = this.resolvedNav.getAll();
  };

  private attachToStore(next: NavStore & EventTarget) {
    if (this._activeNav === next) return;
    this.detachFromStore();
    this._activeNav = next;
    this.items = next.getAll();
    next.addEventListener('change', this._onStoreChange);
  }

  private detachFromStore() {
    if (!this._activeNav) return;
    this._activeNav.removeEventListener('change', this._onStoreChange);
    this._activeNav = null;
  }

  private _onRouteChange = () => {
    this.requestUpdate();
  };

  private _toggleMenu = (e: Event) => {
    e.stopPropagation();
    this.menuOpen = !this.menuOpen;
  };

  private _onOutsideClick = (e: MouseEvent) => {
    if (!this.menuOpen) return;
    const path = e.composedPath();
    if (!path.includes(this)) {
      this.menuOpen = false;
    }
  };

  private _closeMenu = () => {
    this.menuOpen = false;
  };

  // ===== styles & render =====

  static styles = css`
    :host {
      display: block;
    }
    nav {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      min-width: 0;
    }

    .links {
      display: flex;
      gap: 0.5rem;
      flex-wrap: nowrap;
      min-width: 0;
      overflow: hidden;
    }
    a {
      display: inline-block;
      padding: 0.5rem 0.9rem;
      border-radius: 0.5rem;
      background-color: #f3f4f6;
      color: #374151;
      font-weight: 500;
      text-decoration: none;
      transition: background-color 0.2s, color 0.2s;
      white-space: nowrap;
    }
    a:hover {
      background-color: #e0f2fe;
      color: #0369a1;
    }
    a[aria-current='page'] {
      background-color: #0ea5e9;
      color: white;
    }

    .compact {
      display: none;
      align-items: center;
      gap: 0.5rem;
      margin-left: auto;
      position: relative;
    }
    .crumb {
      font-weight: 600;
      color: #374151;
      max-width: 40vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .hamburger {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      background: #f9fafb;
      cursor: pointer;
    }
    .hamburger:hover {
      background: #eef2ff;
    }

    .dropdown {
      position: absolute;
      right: 0;
      top: calc(100% + 6px);
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 0.75rem;
      padding: 0.5rem;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
      z-index: 50;
      min-width: 200px;
    }
    .dropdown a {
      width: 100%;
    }

    @media (max-width: 768px) {
      .links {
        display: none;
      }
      .compact {
        display: inline-flex;
      }
    }
  `;

  private _currentLabel(): string {
    const active = this.items.find((it) => location.pathname === it.path);
    return active?.label ?? 'Menu';
  }

  private _renderLinks(closeOnClick = false) {
    return this.items.map(
      (item) => html`
        <a
          href=${item.path}
          aria-current=${ifDefined(
            location.pathname === item.path ? 'page' : undefined
          )}
          @click=${closeOnClick ? this._closeMenu : undefined}
        >
          ${item.icon ? html`<span class="icon">${item.icon}</span>` : ''}
          <span class="label">${item.label}</span>
        </a>
      `
    );
  }

  render() {
    return html`
      <nav>
        <div class="links">${this._renderLinks()}</div>

        <div class="compact">
          <span class="crumb">${this._currentLabel()}</span>
          <button class="hamburger" @click=${this._toggleMenu}>☰</button>
          ${this.menuOpen
            ? html`<div class="dropdown">${this._renderLinks(true)}</div>`
            : null}
        </div>
      </nav>
    `;
  }
}
