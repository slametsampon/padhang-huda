// packages/quran-viewer/src/components/quran-search-box.ts

import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';

export class QuranSearchBox extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-bottom: 1rem;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
    }
  `;

  /** Placeholder text */
  @property({ type: String }) placeholder = 'Cari kata...';

  @state() private value: string = '';

  private onInput(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(
      new CustomEvent('quran.search', {
        detail: { query: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    return html`<input
      type="text"
      .value=${this.value}
      placeholder=${this.placeholder}
      @input=${this.onInput}
    />`;
  }
}

if (!customElements.get('quran-search-box')) {
  customElements.define('quran-search-box', QuranSearchBox);
}
