// src/context/types.ts
export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  order?: number;
}

export interface NavStore extends EventTarget {
  getAll(): NavItem[];
  add(item: NavItem): void;
  set(items: NavItem[]): void;
}

// HostAPI asli, bersih
export interface HostAPI {
  nav: NavStore;
}

// Tambahkan tipe "branded" untuk context
export type HostApiContextType = HostAPI & { __context__: unknown };
