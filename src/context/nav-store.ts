// src/context/nav-store.ts

import type { NavItem, NavStore } from './types';

export class NavStoreImpl extends EventTarget implements NavStore {
  private items: NavItem[] = [];

  getAll() {
    return [...this.items];
  }

  add(item: NavItem) {
    this.items.push(item);
    this.items.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    this.dispatchEvent(new CustomEvent('change'));
  }

  set(items: NavItem[]) {
    this.items = [...items];
    this.dispatchEvent(new CustomEvent('change'));
  }
}
