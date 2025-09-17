// packages/quran-data/src/providers/provider-factory.ts

import type { AppConfig } from '../../../../src/config/app-config';
import type { QuranDataProvider } from '../quran-contract';
import { ApiQuranProvider } from './api-quran-provider';
import { QuranMockProvider } from '../quran-mock-provider';

export function createQuranProvider(cfg: AppConfig): QuranDataProvider {
  switch (cfg.dataProvider) {
    case 'api': {
      const baseUrl = cfg.providers?.api?.baseUrl;
      if (!baseUrl) {
        console.warn('⚠️ Missing providers.api.baseUrl, fallback to mock.');
        return new QuranMockProvider();
      }
      return new ApiQuranProvider({
        baseUrl,
        timeoutMs: cfg.providers?.api?.timeoutMs,
      });
    }
    case 'db': {
      // TODO: sediakan DbQuranProvider ke depan
      console.warn('⚠️ DB provider not implemented. Fallback to mock.');
      return new QuranMockProvider();
    }
    case 'mock':
    default:
      return new QuranMockProvider();
  }
}
