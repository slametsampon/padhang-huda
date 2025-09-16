// src/context/tokens.ts
import { createContext } from '@lit/context';
import type { HostAPI } from './types';

// Brand ringan agar memenuhi constraint internal @lit/context
export type HostApiContextValue = HostAPI & { __context__: unknown };

// Hasilnya: Context<HostApiContextValue>
export const hostApiContext =
  createContext<HostApiContextValue>('app/host-api');
