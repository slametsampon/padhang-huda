// src/components/layout/app-shell.test.ts

import { describe, it, expect } from 'vitest';
import { createHostAPI } from '../../context/host-api';
import { flush } from '../../test-utils';
import '../../components/layout/app-shell';
import '../../components/layout/app-nav';

describe('<app-shell> + <app-nav>', () => {
  it('consumer dapat nav items dari provider', async () => {
    const shell = document.createElement('app-shell') as any;
    document.body.appendChild(shell);

    const api = createHostAPI();
    shell.hostApi = api; // ✅ akan diteruskan ke <app-nav> sebagai .hostApi

    await shell.updateComplete;
    console.log('📌 After <app-shell> mount:', shell.shadowRoot?.innerHTML);

    const nav = shell.shadowRoot!.querySelector('app-nav')!;
    expect(nav).toBeTruthy();

    await (nav as any).updateComplete;
    console.log('📌 Initial <app-nav> content:', nav.shadowRoot?.innerHTML);

    // ➕ Tambahkan nav item ke store dari hostApi (bukan HostContext)
    api.nav.add({ label: 'Qur’an', path: '/quran' });
    console.log('📌 After nav.add():', api.nav.getAll());

    // 🔑 beri kesempatan <app-nav> memproses event & re-render
    await flush();
    await (nav as any).updateComplete;
    console.log('📌 After nav.updateComplete:', nav.shadowRoot?.innerHTML);

    const label = nav.shadowRoot!.querySelector('.label');
    console.log('📌 Found label element:', label?.outerHTML);

    expect(label).not.toBeNull();
    expect(label?.textContent).toBe('Qur’an');
  });
});
