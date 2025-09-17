// src/main.ts

import './components/layout/app-shell';
import './components/views/not-found-view';
import { HostContext } from './host-context';
import { initRouter, setRoutes } from './router';
import type { PluginManifest, PluginModule } from './plugin-contract';
import { QuranMockProvider } from '../packages/quran-data/src/quran-mock-provider';

type FetchLike = (
  input: RequestInfo | URL,
  init?: RequestInit
) => Promise<Response>;
type ModuleLoader = (href: string) => Promise<PluginModule>;

export interface PluginLoaderOptions {
  fetchFn?: FetchLike;
  moduleLoader?: ModuleLoader;
}

/**
 * Loader plugin – diexport agar bisa dipanggil di test.
 * Bisa di-injeksi fetch/moduleLoader supaya tidak import http: saat Vitest.
 */
export async function loadPlugins(opts: PluginLoaderOptions = {}) {
  const fetchImpl: FetchLike = opts.fetchFn ?? fetch;

  console.log('🔍 Fetching plugins.json...');
  const res = await fetchImpl('/plugins.json');
  const plugins: PluginManifest[] = await res.json();

  const allRoutes: { path: string; component: string }[] = [];

  for (const p of plugins) {
    try {
      if (!p.name || !p.url || !p.element) continue;

      const href = new URL(/* @vite-ignore */ p.url, window.location.origin)
        .href;

      const mod: PluginModule = opts.moduleLoader
        ? await opts.moduleLoader(href) // ✅ test path
        : await import(/* @vite-ignore */ href); // ✅ runtime path

      if (!customElements.get(p.element)) {
        try {
          customElements.define(p.element, mod.default);
        } catch (e) {
          console.error(
            `❌ Gagal define <${p.element}>. Pastikan plugin tidak mendefinisikan custom element sendiri dengan constructor yang sama.`,
            e
          );
          continue;
        }
      }

      if (p.routes) {
        for (const r of p.routes) {
          allRoutes.push({ path: r.path, component: r.component });
        }
      }

      if (p.nav) {
        HostContext.nav.add(p.nav);
      }

      if (mod.init) {
        await mod.init(HostContext);
      }

      console.info(`✅ Plugin loaded: ${p.name}`);
    } catch (err) {
      console.error(`❌ Failed to load plugin ${p.name}`, err);
    }
  }

  return allRoutes;
}

/**
 * Bootstrap app utama – hanya dipanggil di browser biasa (tidak di Vitest).
 */
export async function bootstrapApp() {
  // Provider global mock (bisa diganti nanti)
  HostContext.provider = new QuranMockProvider();

  await customElements.whenDefined('app-shell');

  const appShell = document.querySelector('app-shell');
  const outlet = appShell?.shadowRoot?.querySelector(
    '#outlet'
  ) as HTMLElement | null;
  if (!outlet) throw new Error('❌ Outlet not found in <app-shell>');

  initRouter(outlet);

  const routes = await loadPlugins();
  setRoutes(routes);
}

// 🚀 Auto-bootstrap hanya jika bukan environment test (Vitest)
const isVitest =
  typeof (globalThis as any).vi !== 'undefined' ||
  typeof (globalThis as any).vitest !== 'undefined';
if (
  typeof window !== 'undefined' &&
  typeof document !== 'undefined' &&
  !isVitest
) {
  bootstrapApp();
}
