// src/host-context.ts
import { NavStoreImpl } from './context/nav-store';
import type { NavStore } from './context/types';

export interface HostContext {
  version: string;
  eventBus: EventTarget;
  navigate: (path: string) => void;
  nav: NavStore; // ✅ tambahkan kontrak nav
}

export const HostContext: HostContext = {
  version: '1.0.0',
  eventBus: new EventTarget(),
  navigate: (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  },
  nav: new NavStoreImpl(), // ✅ sediakan implementasi
};
