// packages/quran-data/src/providers/provider-factory.test.ts

import { describe, it, expect } from 'vitest';
import { createQuranProvider } from './provider-factory';

describe('provider-factory', () => {
  it('returns mock when api baseUrl missing', () => {
    const p = createQuranProvider({
      dataProvider: 'api',
      providers: { api: {} as any },
    });
    expect(p).toBeTruthy(); // instance exists (mock fallback)
    expect(typeof (p as any).search).toBe('function');
  });
});
