// src/plugin-loader.test.ts

import { describe, it, expect, vi } from 'vitest';
import { loadPlugins } from './main';
import { HostContext } from './host-context';

// 🧪 Stub fetch: kembalikan manifest minimal
const fetchStub = vi.fn(async () => {
  return {
    json: async () => [
      {
        name: 'quran',
        version: '1.0.0',
        url: '/plugins/quran-viewer.js',
        element: 'quran-view',
        routes: [{ path: '/quran', component: 'quran-view' }],
        nav: { label: '📖 Qur’an', path: '/quran' },
      },
    ],
  } as unknown as Response;
});

// 🧪 Stub moduleLoader: bypass import(http:), kembalikan modul plugin tiruan
const moduleLoaderStub = vi.fn(async (href: string) => {
  // Opsional: pastikan href yang masuk benar
  expect(href).toContain('/plugins/quran-viewer.js');

  // default export = constructor HTMLElement (untuk customElements.define)
  class FakeQuranView extends HTMLElement {}
  const init = vi.fn(async () => {
    /* no-op */
  });

  return { default: FakeQuranView, init } as any;
});

describe('plugin loader integration', () => {
  it('should load plugin manifest and define custom element', async () => {
    // Pastikan store nav kosong di awal (opsional)
    // (Tergantung implementasi, Anda bisa reset manual jika perlu)

    const routes = await loadPlugins({
      fetchFn: fetchStub,
      moduleLoader: moduleLoaderStub,
    });

    // ✅ Routes dari manifest terdaftar
    expect(routes).toEqual([{ path: '/quran', component: 'quran-view' }]);

    // ✅ Custom element sudah ter-define
    expect(customElements.get('quran-view')).toBeTruthy();

    // ✅ Nav items terisi
    const navItems = HostContext.nav.getAll();
    expect(navItems.some((i) => i.path === '/quran')).toBe(true);
  });
});
