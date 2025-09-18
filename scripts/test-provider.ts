// scripts/test-provider.ts
import { createQuranProvider } from '../packages/quran-data/src/providers/provider-factory';

// Config pakai mock → akan load JsonQuranDataProvider
const provider = createQuranProvider({ dataProvider: 'mock' } as any);

async function main() {
  console.log('=== Test Quran Provider (mock JSON) ===');

  // Ambil surah pertama
  const surah1 = await provider.getSurah(1);
  console.log('Surah 1:', surah1?.name.transliteration, surah1?.name.arabic);

  // Ambil ayat pertama dari surah 1
  const verse11 = await provider.getVerse(1, 1);
  console.log('Verse 1:1:', verse11?.text.arabic);

  // Cari kata "اللَّه"
  const searchResults = await provider.search('اللَّه');
  console.log(
    `Search results for "اللَّه":`,
    searchResults.slice(0, 3).map((v) => ({
      surah: v.surah,
      ayah: v.ayah,
      text: v.text.arabic,
    }))
  );

  // Hitung semua ayat (hati-hati besar kalau semua surah sudah diisi mock)
  const allVerses = await provider.getAllVerses();
  console.log('Total verses loaded (mock):', allVerses.length);

  console.log('=== Test finished ===');
}

main().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
