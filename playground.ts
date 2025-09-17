// playground.ts

import { QuranMockProvider } from './packages/quran-data/src/quran-mock-provider';

async function main() {
  const provider = new QuranMockProvider();

  console.log(await provider.getVerse(1, 1)); // Al-Fatiha:1
  console.log(await provider.getSurah(1)); // Surah Al-Fatiha
  console.log(await provider.search('puji', 'id')); // cari kata "puji"
}

main();
