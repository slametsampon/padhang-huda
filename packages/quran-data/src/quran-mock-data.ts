// packages/quran-data/src/quran-mock-data.ts

import { QuranVerse, QuranSurah } from './quran-contract';

/**
 * Dataset mock kecil:
 * - Al-Fatiha (1:1-2)
 * - Al-Baqarah (2:1)
 */
export const QURAN_MOCK_VERSES: QuranVerse[] = [
  {
    surah: 1,
    ayah: 1,
    text: { arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ' },
    translations: {
      id: 'Dengan nama Allah Yang Maha Pengasih lagi Maha Penyayang',
      en: 'In the name of Allah, the Entirely Merciful, the Especially Merciful',
    },
    meta: { juz: 1, page: 1 },
  },
  {
    surah: 1,
    ayah: 2,
    text: { arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ' },
    translations: {
      id: 'Segala puji bagi Allah, Tuhan semesta alam',
      en: 'All praise is due to Allah, Lord of the worlds',
    },
    meta: { juz: 1, page: 1 },
  },
  {
    surah: 2,
    ayah: 1,
    text: { arabic: 'الم' },
    translations: {
      id: 'Alif, Lam, Mim',
      en: 'Alif, Lam, Meem',
    },
    meta: { juz: 1, page: 2 },
  },
];

/**
 * Dataset mock surah minimal
 */
export const QURAN_MOCK_SURAHS: QuranSurah[] = [
  {
    number: 1,
    name: {
      arabic: 'الفاتحة',
      transliteration: 'Al-Fatiha',
      translation: { id: 'Pembukaan', en: 'The Opening' },
    },
    revelation: 'Meccan',
    ayahs: QURAN_MOCK_VERSES.filter((v) => v.surah === 1),
  },
  {
    number: 2,
    name: {
      arabic: 'البقرة',
      transliteration: 'Al-Baqarah',
      translation: { id: 'Sapi Betina', en: 'The Cow' },
    },
    revelation: 'Madinan',
    ayahs: QURAN_MOCK_VERSES.filter((v) => v.surah === 2),
  },
];
