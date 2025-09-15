// src/main.ts

import './components/app-shell';
import { HostContext } from './host-context';
import { registerRoute, startRouter } from './router';

async function loadPlugins() {
  console.log('🔍 Fetching plugins.json...');
  const res = await fetch('/plugins.json');
  const plugins = await res.json();
  console.log('📦 Plugins registry loaded:', plugins);

  for (const p of plugins) {
    try {
      console.log(`⏳ Loading plugin: ${p.name} from ${p.url}`);
      const mod = await import(new URL(p.url, window.location.origin).href);

      if (!customElements.get(p.element)) {
        console.log(`⚙️ Defining custom element: <${p.element}>`);
        customElements.define(p.element, mod.default);
      } else {
        console.log(`ℹ️ Element <${p.element}> already defined`);
      }

      if (mod.init) {
        console.log(`🚀 Initializing plugin: ${p.name}`);
        mod.init(HostContext, { registerRoute });
      }

      console.info(`✅ Plugin loaded successfully: ${p.name}`);
    } catch (err) {
      console.error(`❌ Failed to load plugin ${p.name}`, err);
    }
  }
}

// 👇 Router dijalankan setelah semua plugin siap
loadPlugins().then(() => {
  console.log('🛣️ Starting router...');
  startRouter();
});
