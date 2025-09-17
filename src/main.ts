// src/main.ts

import './components/layout/app-shell';
import './components/views/not-found-view';
import { HostContext } from './host-context';
import { initRouter, setRoutes } from './router';
import type { PluginManifest, PluginModule } from './plugin-contract';

// 🔗 import provider mock
import { QuranMockProvider } from '../packages/quran-data/src/quran-mock-provider';

async function loadPlugins() {
  console.log('🔍 Fetching plugins.json...');
  const res = await fetch('/plugins.json');
  const plugins: PluginManifest[] = await res.json();

  const allRoutes = [];

  for (const p of plugins) {
    try {
      if (!p.name || !p.url || !p.element) continue;

      const mod: PluginModule = await import(
        new URL(/* @vite-ignore */ p.url, window.location.origin).href
      );

      if (!customElements.get(p.element)) {
        customElements.define(p.element, mod.default);
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
        await mod.init(HostContext); // ✅ plugin akan baca ctx.provider
      }

      console.info(`✅ Plugin loaded: ${p.name}`);
    } catch (err) {
      console.error(`❌ Failed to load plugin ${p.name}`, err);
    }
  }

  return allRoutes;
}

(async () => {
  // ✅ Provider global diinisialisasi sekali
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
})();
