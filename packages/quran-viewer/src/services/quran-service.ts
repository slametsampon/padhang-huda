// packages/quran-viewer/src/services/quran-service.ts

import { createQuranProvider } from '../../../quran-data/src/providers/provider-factory';

const provider = createQuranProvider({ dataProvider: 'mock' } as any);

export async function loadSurah(surah: number) {
  return await provider.getSurah(surah);
}

export async function loadVerse(surah: number, ayah: number) {
  return await provider.getVerse(surah, ayah);
}

export async function searchVerses(query: string) {
  return await provider.search(query, 'english');
}
