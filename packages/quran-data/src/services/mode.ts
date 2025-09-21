// packages/quran-data/src/services/mode.ts

export type DeviceMode = 'mock' | 'local' | 'online';

const KEY = 'device.mode';
const VALID_MODES: DeviceMode[] = ['mock', 'local', 'online'];

const modeCapabilities: Record<DeviceMode, string[]> = {
  mock: ['mock'],
  local: ['db', 'local'],
  online: ['api', 'online'],
};

/**
 * Mengecek apakah mode sekarang mendukung capability tertentu.
 */
export function hasCapability(capability: string): boolean {
  const mode = getMode();
  return modeCapabilities[mode]?.includes(capability) ?? false;
}

/**
 * Mengambil mode saat ini dari localStorage.
 * Jika tidak tersedia atau invalid, fallback ke 'mock'.
 */
export function getMode(): DeviceMode {
  const raw = localStorage.getItem(KEY);
  return VALID_MODES.includes(raw as DeviceMode) ? (raw as DeviceMode) : 'mock';
}

/**
 * Mengatur mode baru ke localStorage.
 * Hanya menerima nilai yang valid.
 */
export function setMode(mode: DeviceMode): void {
  if (VALID_MODES.includes(mode)) {
    localStorage.setItem(KEY, mode);
  } else {
    console.warn(`[mode] Invalid mode "${mode}", ignoring`);
  }
}

/**
 * Cek apakah mode saat ini adalah 'mock'
 */
export function isMockMode(): boolean {
  return getMode() === 'mock';
}

/**
 * Cek apakah mode saat ini adalah 'local'
 */
export function isLocalMode(): boolean {
  return hasCapability('db');
}

/**
 * Cek apakah mode saat ini adalah 'online'
 */
export function isOnlineMode(): boolean {
  return hasCapability('api');
}
