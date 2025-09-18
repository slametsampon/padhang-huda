// src/components/layout/app-header.ts
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { HostAPI } from '../../context/types';
import './app-nav';

@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ attribute: false }) hostApi?: HostAPI;

  createRenderRoot() {
    return this;
  }

  private _userLabel(): string {
    return (
      (this.hostApi as any)?.auth?.user?.name ??
      (this.hostApi as any)?.user?.name ??
      'Tamu'
    );
  }

  private _userAvatar(): string | null {
    return (
      (this.hostApi as any)?.auth?.user?.avatarUrl ??
      (this.hostApi as any)?.user?.avatarUrl ??
      null
    );
  }

  private _toggleTheme = () => {
    const themeApi = (this.hostApi as any)?.theme;
    if (typeof themeApi?.toggle === 'function') {
      themeApi.toggle();
    } else {
      document.documentElement.classList.toggle('dark');
    }
    this.dispatchEvent(
      new CustomEvent('toggle-theme', { bubbles: true, composed: true })
    );
  };

  private _onUserClick = () => {
    this.dispatchEvent(
      new CustomEvent('user-click', { bubbles: true, composed: true })
    );
  };

  render() {
    const logoUrl =
      (this.hostApi as any)?.branding?.logoUrl ??
      (this.hostApi as any)?.logoUrl ??
      null;

    const userLabel = this._userLabel();
    const avatar = this._userAvatar();
    const userInitial = userLabel.charAt(0).toUpperCase();

    return html`
      <style>
        .ph-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.5rem 1rem;
          border-bottom: 1px solid #e5e7eb;
          background: var(--header-bg, #ffffff);
          color: var(--header-fg, #111827);
        }

        /* === Logo === */
        .ph-logo {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          white-space: nowrap;
          padding: 0.35rem 0.75rem;
          border-radius: 0.75rem;
          background: #f9fafb;
          text-decoration: none;
          color: var(--brand-color, #4f46e5);
          transition: background 0.2s, box-shadow 0.2s;
        }
        .ph-logo:hover {
          background: #eef2ff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .ph-logo img {
          height: 28px;
          width: 28px;
          object-fit: contain;
          border-radius: 6px;
        }

        .ph-nav {
          flex: 1;
          min-width: 0;
        }

        /* === Actions === */
        .ph-actions {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-user {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          color: #374151;
          padding: 0.35rem 0.65rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s;
        }
        .btn-user:hover {
          background: #f3f4f6;
        }

        .avatar {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          object-fit: cover;
          background: linear-gradient(135deg, #7c3aed, #9333ea);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .btn-theme {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .btn-theme:hover {
          background: #f3f4f6;
        }
      </style>

      <header class="ph-header" role="banner">
        <a class="ph-logo" href="/" aria-label="Beranda">
          ${logoUrl
            ? html`<img alt="Logo" src="${logoUrl}" />`
            : html`<span aria-hidden="true">🌟</span>`}
          <span>Padhang Huda</span>
        </a>

        <app-nav class="ph-nav" .hostApi=${this.hostApi}></app-nav>

        <div class="ph-actions">
          <button class="btn-user" @click=${this._onUserClick} title="Akun">
            <span>${userLabel}</span>
            ${avatar
              ? html`<img class="avatar" src=${avatar} alt="avatar" />`
              : html`<span class="avatar">${userInitial}</span>`}
          </button>
          <button class="btn-theme" @click=${this._toggleTheme} title="Tema">
            🌓
          </button>
        </div>
      </header>
    `;
  }
}
