// src/context/nav-store.test.ts

import { describe, it, expect, vi } from 'vitest';
import { NavStoreImpl } from './nav-store';

describe('NavStoreImpl', () => {
  it('menambahkan item ke store dan trigger event change', () => {
    const store = new NavStoreImpl();
    const listener = vi.fn();

    store.addEventListener('change', listener);

    store.add({ label: 'Qur’an', path: '/quran' });

    expect(store.getAll()).toEqual([{ label: 'Qur’an', path: '/quran' }]);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('mengatur ulang item dengan set()', () => {
    const store = new NavStoreImpl();

    store.set([
      { label: 'Hadith', path: '/hadith' },
      { label: 'Qur’an', path: '/quran' },
    ]);

    const all = store.getAll();
    expect(all.length).toBe(2);
    expect(all[0].path).toBe('/hadith');
  });
});
