// packages/quran-viewer/src/components/quran-goto.ts

import { LitElement, html, css } from 'lit';

export class QuranGoto extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-bottom: 0.5rem;
    }
    form {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
    input {
      padding: 0.35rem 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 8rem;
    }
    button {
      padding: 0.35rem 0.7rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: #fff;
      cursor: pointer;
    }
  `;

  private onSubmit(e: Event) {
    e.preventDefault();
    const inp = this.shadowRoot?.querySelector('input') as HTMLInputElement;
    const val = (inp?.value || '').trim();
    const m = val.match(/^(\d{1,3}):(\d{1,3})$/);
    if (!m) {
      alert('Format harus "surah:ayat", misal 2:255');
      return;
    }
    const surah = Number(m[1]);
    const ayah = Number(m[2]);
    window.dispatchEvent(
      new CustomEvent('quran.goto', { detail: { surah, ayah } })
    );
  }

  render() {
    return html`
      <form @submit=${this.onSubmit}>
        <label>Go to:</label>
        <input placeholder="2:255" aria-label="Go to surah:ayah" />
        <button type="submit">Go</button>
      </form>
    `;
  }
}

if (!customElements.get('quran-goto')) {
  customElements.define('quran-goto', QuranGoto);
}
