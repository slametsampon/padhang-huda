// src/events/register-host-events.ts

import { HostContext } from '../host-context';
import {
  QURAN_GOTO,
  QURAN_SEARCH,
  type QuranGotoDetail,
  type QuranSearchDetail,
} from '../../packages/app-events/src';

// Pasang semua handler host untuk event global (window)
export function registerHostEventHandlers() {
  // 1) Perintah pindah ayat → navigasi host ke /quran?surah=&ayah=
  window.addEventListener(QURAN_GOTO, (ev: Event) => {
    const { surah, ayah } = (ev as CustomEvent<QuranGotoDetail>).detail;
    if (typeof surah === 'number') {
      const q = new URLSearchParams({
        surah: String(surah),
        ayah: String(ayah ?? 1),
      });
      HostContext.navigate(`/quran?${q.toString()}`);
    }
  });

  // 2) Permintaan pencarian
  window.addEventListener(QURAN_SEARCH, (ev: Event) => {
    const { query, lang = 'id' } = (ev as CustomEvent<QuranSearchDetail>)
      .detail;
    // Implementasi host bebas: arahkan ke /quran?search=... atau tampilkan panel search
    const q = new URLSearchParams({ search: query, lang });
    HostContext.navigate(`/quran?${q.toString()}`);
  });
}
