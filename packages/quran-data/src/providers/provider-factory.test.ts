// packages/quran-data/src/providers/provider-factory.test.ts

import { describe, it, expect } from 'vitest';
import { createQuranProvider } from './provider-factory';
import { JsonQuranDataProvider } from './json-quran-provider';
import { ApiQuranProvider } from './api-quran-provider';

describe('provider-factory', () => {
  it('returns JsonQuranDataProvider when mock mode', () => {
    const p = createQuranProvider({ dataProvider: 'mock' } as any);
    expect(p).toBeInstanceOf(JsonQuranDataProvider);
  });

  it('returns ApiQuranProvider when api mode with baseUrl', () => {
    const p = createQuranProvider({
      dataProvider: 'api',
      providers: { api: { baseUrl: 'http://localhost:4000' } },
    } as any);
    expect(p).toBeInstanceOf(ApiQuranProvider);
  });

  it('falls back to JsonQuranDataProvider when api mode but baseUrl missing', () => {
    const p = createQuranProvider({
      dataProvider: 'api',
      providers: { api: {} as any },
    });
    expect(p).toBeInstanceOf(JsonQuranDataProvider);
  });
  it('falls back to JsonQuranDataProvider when db mode', () => {
    const p = createQuranProvider({ dataProvider: 'db' } as any);
    expect(p).toBeInstanceOf(JsonQuranDataProvider);
  });
});
