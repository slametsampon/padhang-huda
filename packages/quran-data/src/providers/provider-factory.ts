// packages/quran-data/src/providers/provider-factory.ts

import type { AppConfig } from '../../../../src/config/app-config';
import type { QuranDataProvider } from '../quran-contract';
import { ApiQuranProvider } from './api-quran-provider';
import { JsonQuranDataProvider } from './json-quran-provider';

/**
 * Factory untuk memilih provider Qur’an berdasarkan konfigurasi.
 * - api  → ApiQuranProvider (backend custom)
 * - db   → (TODO) Database provider
 * - mock → JsonQuranDataProvider (default), bisa pakai QuranMockProvider lama bila perlu
 */
export function createQuranProvider(cfg: AppConfig): QuranDataProvider {
  switch (cfg.dataProvider) {
    case 'api': {
      const baseUrl = cfg.providers?.api?.baseUrl;
      if (!baseUrl) {
        console.warn(
          '⚠️ Missing providers.api.baseUrl, fallback to mock JSON.'
        );
        return new JsonQuranDataProvider();
      }
      return new ApiQuranProvider({
        baseUrl,
        timeoutMs: cfg.providers?.api?.timeoutMs,
      });
    }
    case 'db': {
      console.warn('⚠️ DB provider not implemented. Fallback to mock JSON.');
      return new JsonQuranDataProvider();
    }
    case 'mock':
    default:
      return new JsonQuranDataProvider();
  }
}
