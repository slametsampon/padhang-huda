// src/config/app-config.test.ts

import { describe, it, expect, vi } from 'vitest';
import { loadAppConfig } from './app-config';

describe('app-config', () => {
  it('fallback to mock when fetch fails', async () => {
    const fetchStub = vi.fn(async () => {
      throw new Error('network');
    });
    const cfg = await loadAppConfig(fetchStub as any);
    expect(cfg.dataProvider).toBe('mock');
  });

  it('load api config', async () => {
    const fetchStub = vi.fn(async () => ({
      ok: true,
      json: async () => ({
        dataProvider: 'api',
        providers: { api: { baseUrl: 'https://x' } },
      }),
    })) as any;
    const cfg = await loadAppConfig(fetchStub);
    expect(cfg.dataProvider).toBe('api');
  });
});
