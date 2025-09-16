// src/plugin-contract.ts

import type { HostContext } from './host-context';

export interface PluginModule {
  default: CustomElementConstructor; // Custom Element class
  init?(ctx: HostContext): void | Promise<void>;
  dispose?(): void;
}

export interface PluginManifest {
  name: string;
  version: string;
  url: string;
  element: string;
  routes?: { path: string; component: string }[];

  // ✅ opsional, dipakai app-nav
  nav?: {
    label: string;
    path: string;
    icon?: string;
    order?: number;
  };
}
