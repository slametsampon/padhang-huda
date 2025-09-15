// src/components/layout/test-component.ts

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('test-component')
export class TestComponent extends LitElement {
  render() {
    return html`<p>✅ Test Component Loaded</p>`;
  }
}
