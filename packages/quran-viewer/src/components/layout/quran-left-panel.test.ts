// packages/quran-viewer/src/components/layout/quran-left-panel.test.ts

import { fixture, html } from '@open-wc/testing';
import { expect, describe, it } from 'vitest';
import './quran-left-panel';

describe('<quran-left-panel>', () => {
  it('renders slotted content', async () => {
    const el = await fixture(html`
      <quran-left-panel>
        <div id="inside">Hello</div>
      </quran-left-panel>
    `);
    const slotContent = el.querySelector('#inside');
    expect(slotContent).to.not.be.null;
    expect(slotContent?.textContent).to.equal('Hello');
  });
});
