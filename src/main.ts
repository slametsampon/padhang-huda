// src/main.ts

import './components/layout/app-shell';
import './components/views/not-found-view'; // pastikan not-found tersedia
import { HostContext } from './host-context';
import { initRouter, setRoutes } from './router';
import type { PluginManifest, PluginModule } from './plugin-contract';

async function loadPlugins() {
  console.log('🔍 Fetching plugins.json...');
  const res = await fetch('/plugins.json');
  const plugins: PluginManifest[] = await res.json();
  console.log('📦 Plugins registry loaded:', plugins);

  const allRoutes = [];
  const seenTags = new Set<string>();

  for (const p of plugins) {
    try {
      if (!p.name || !p.url || !p.element) {
        console.warn(`⚠️ Invalid manifest for plugin:`, p);
        continue;
      }

      if (seenTags.has(p.element)) {
        console.warn(`⚠️ Duplicate plugin element <${p.element}> skipped`);
        continue;
      }
      seenTags.add(p.element);

      console.log(`⏳ Loading plugin: ${p.name} from ${p.url}`);
      const mod: PluginModule = await import(
        new URL(/* @vite-ignore */ p.url, window.location.origin).href
      );

      const ctor = mod.default;
      if (!ctor) {
        console.warn(`⚠️ Plugin ${p.name} has no default export`);
        continue;
      }

      const existingCtor = customElements.get(p.element);
      if (!existingCtor) {
        console.log(`⚙️ Defining <${p.element}>`);
        customElements.define(p.element, ctor);
      } else if (existingCtor !== ctor) {
        console.error(
          `❌ Conflict: <${p.element}> already defined with a different constructor`
        );
        continue; // skip this plugin
      }

      if (p.routes) {
        for (const r of p.routes) {
          allRoutes.push({ path: r.path, component: r.component });
        }
      }

      // ✅ injeksi menu nav bila ada deklarasi
      if (p.nav) {
        HostContext.nav.add({
          label: p.nav.label,
          path: p.nav.path,
          icon: p.nav.icon,
          order: p.nav.order,
        });
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

(async () => {
  // ✅ Pastikan app-shell sudah siap sebelum cari outlet
  await customElements.whenDefined('app-shell');

  const appShell = document.querySelector('app-shell');
  const outlet = appShell?.shadowRoot?.querySelector(
    '#outlet'
  ) as HTMLElement | null;

  if (!outlet) throw new Error('❌ Outlet not found in <app-shell>');

  initRouter(outlet);

  const routes = await loadPlugins();
  console.log('✅ Routes configured:', routes);
  setRoutes(routes);
})();
