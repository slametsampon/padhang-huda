// packages/app-events/src/index.ts
// Kontrak event lintas host–plugin

// Nama event (string literal) — stabil untuk publik
export const QURAN_GOTO = 'quran.goto' as const;
export const QURAN_SEARCH = 'quran.search' as const;
export const QURAN_VIEWED = 'quran.viewed' as const;

// Payloads
export interface QuranGotoDetail {
  surah: number;
  ayah: number;
  // optional metadata; tidak wajib dipakai
  source?: string;
}

export interface QuranSearchDetail {
  query: string;
  lang?: string; // 'id' default
  source?: string;
}

export interface QuranViewedDetail {
  surah: number;
  ayah: number;
  source?: string;
}

// Helper generik kecil (non-intrusive)
export function emit<T>(target: EventTarget, type: string, detail: T) {
  target.dispatchEvent(new CustomEvent<T>(type, { detail }));
}

export function on<T>(
  target: EventTarget,
  type: string,
  handler: (e: CustomEvent<T>) => void
) {
  const fn = (e: Event) => handler(e as CustomEvent<T>);
  target.addEventListener(type, fn as EventListener);
  return () => target.removeEventListener(type, fn as EventListener);
}
