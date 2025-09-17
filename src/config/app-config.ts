// src/config/app-config.ts

export type AppConfig = {
  dataProvider: 'mock' | 'api' | 'db';
  providers?: {
    api?: { baseUrl: string; timeoutMs?: number };
  };
};

export async function loadAppConfig(
  fetchFn: typeof fetch = fetch
): Promise<AppConfig> {
  try {
    const res = await fetchFn('/app.config.json');
    if (!res.ok)
      throw new Error(`Failed to fetch app.config.json: ${res.status}`);
    return await res.json();
  } catch (e) {
    // Fallback aman ke mock jika config gagal
    console.warn('⚠️ Using default config (mock provider). Reason:', e);
    return { dataProvider: 'mock' };
  }
}
