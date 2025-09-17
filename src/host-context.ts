// src/host-context.ts

import { NavStoreImpl } from './context/nav-store';
import type { NavStore } from './context/types';

// 🔗 impor kontrak Qur’an provider
import type { QuranDataProvider } from '../packages/quran-data/src/quran-contract';

export interface HostContext {
  version: string;

  /** Event bus sederhana (berbasis EventTarget) */
  eventBus: EventTarget;

  /** Navigasi SPA */
  navigate: (path: string) => void;

  /** Global navigation store */
  nav: NavStore;

  /** Locale/language default (opsional) */
  locale?: string;

  /** Global Qur’an data provider (opsional, default di plugin = mock) */
  provider?: QuranDataProvider;
}

export const HostContext: HostContext = {
  version: '1.0.0',
  eventBus: new EventTarget(),
  navigate: (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  },
  nav: new NavStoreImpl(),
  // ❗️ provider & locale tidak diisi di sini → nanti diinit oleh host (Langkah 4)
};
