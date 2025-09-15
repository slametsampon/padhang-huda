// src/main.ts

import './components/layout/app-shell';
import { HostContext } from './host-context';
import { registerRoute, startRouter } from './router';
import type { PluginManifest, PluginModule } from './plugin-contract';

async function loadPlugins() {
  console.log('🔍 Fetching plugins.json...');
  const res = await fetch('/plugins.json');
  const plugins: PluginManifest[] = await res.json();
  console.log('📦 Plugins registry loaded:', plugins);

  for (const p of plugins) {
    try {
      if (!p.name || !p.url || !p.element) {
        console.warn(`⚠️ Invalid manifest for plugin:`, p);
        continue;
      }

      console.log(`⏳ Loading plugin: ${p.name} from ${p.url}`);
      const mod: PluginModule = await import(
        new URL(/* @vite-ignore */ p.url, window.location.origin).href
      );

      if (!customElements.get(p.element)) {
        console.log(`⚙️ Defining <${p.element}>`);
        customElements.define(p.element, mod.default);
      }

      if (mod.init) {
        mod.init(HostContext, { registerRoute });
      }

      console.info(`✅ Plugin loaded: ${p.name}`);
    } catch (err) {
      console.error(`❌ Failed to load plugin ${p.name}`, err);
    }
  }
}

loadPlugins().then(() => {
  startRouter();
});
