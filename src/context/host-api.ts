// src/context/host-api.ts

import type { HostAPI } from './types';
import { NavStoreImpl } from './nav-store';

export function createHostAPI(): HostAPI {
  return { nav: new NavStoreImpl() };
}
