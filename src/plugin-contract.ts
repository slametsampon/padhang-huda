// src/plugin-contract.ts

import type { HostContext } from './host-context';

export interface PluginModule {
  default: CustomElementConstructor; // Custom Element class
  init?(ctx: HostContext, helpers: PluginHelpers): void | Promise<void>;
  dispose?(): void;
}

export interface PluginManifest {
  name: string;
  version: string;
  url: string; // lokasi file .js di CDN/public
  element: string; // tag name custom element
  hostApi: string; // versi host yang kompatibel
  routes?: string[]; // route yang plugin handle
  slots?: string[]; // opsional slot untuk UI tertentu
}

export interface PluginHelpers {
  registerRoute: (path: string, handler: () => void) => void;
}
