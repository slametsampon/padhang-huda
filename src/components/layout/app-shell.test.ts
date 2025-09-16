// src/components/layout/app-shell.test.ts

import { describe, it, expect } from 'vitest';
import { createHostAPI } from '../../context/host-api';
import '../../components/layout/app-shell';
import '../../components/layout/app-nav';

describe('<app-shell> + <app-nav>', () => {
  it('consumer dapat nav items dari provider', async () => {
    const shell = document.createElement('app-shell') as any;
    document.body.appendChild(shell);

    const api = createHostAPI();
    shell.hostApi = api;

    // tunggu render <app-shell>
    await shell.updateComplete;

    // cari app-nav setelah shell beres render
    const nav = shell.shadowRoot!.querySelector('app-nav')!;
    expect(nav).toBeTruthy(); // sanity check

    // tunggu render <app-nav>
    await (nav as any).updateComplete;

    // tambahkan nav item
    api.nav.add({ label: 'Qur’an', path: '/quran' });

    // karena consumer subscribe, tunggu update lagi
    await (nav as any).updateComplete;

    expect(nav.shadowRoot!.textContent).toContain('Qur’an');
  });
});
