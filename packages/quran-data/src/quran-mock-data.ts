// packages/quran-data/src/quran-mock-data.ts

import type { QuranVerse, QuranSurah } from './quran-contract';

/**
 * Dataset sample sedang:
 * - Al-Fatiha (1:1–7)
 * - Al-Baqarah (2:1–5)
 */
export const QURAN_MOCK_VERSES: QuranVerse[] = [
  // Surah 1: Al-Fatiha
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
    surah: 1,
    ayah: 3,
    text: { arabic: 'الرَّحْمَٰنِ الرَّحِيمِ' },
    translations: {
      id: 'Yang Maha Pengasih, Maha Penyayang',
      en: 'The Entirely Merciful, the Especially Merciful',
    },
    meta: { juz: 1, page: 1 },
  },
  {
    surah: 1,
    ayah: 4,
    text: { arabic: 'مَالِكِ يَوْمِ الدِّينِ' },
    translations: {
      id: 'Pemilik hari pembalasan',
      en: 'Sovereign of the Day of Recompense',
    },
    meta: { juz: 1, page: 1 },
  },
  {
    surah: 1,
    ayah: 5,
    text: { arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ' },
    translations: {
      id: 'Hanya kepada-Mu kami menyembah dan hanya kepada-Mu kami mohon pertolongan',
      en: 'It is You we worship and You we ask for help',
    },
    meta: { juz: 1, page: 1 },
  },
  {
    surah: 1,
    ayah: 6,
    text: { arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ' },
    translations: {
      id: 'Tunjukilah kami jalan yang lurus',
      en: 'Guide us to the straight path',
    },
    meta: { juz: 1, page: 1 },
  },
  {
    surah: 1,
    ayah: 7,
    text: {
      arabic:
        'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
    },
    translations: {
      id: 'Jalan orang-orang yang Engkau beri nikmat, bukan jalan mereka yang dimurkai, dan bukan pula jalan mereka yang sesat',
      en: 'The path of those upon whom You have bestowed favor, not of those who have evoked Your anger or of those who are astray',
    },
    meta: { juz: 1, page: 1 },
  },

  // Surah 2: Al-Baqarah (1–5)
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
  {
    surah: 2,
    ayah: 2,
    text: {
      arabic: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِلْمُتَّقِينَ',
    },
    translations: {
      id: 'Kitab (Al-Qur’an) ini tidak ada keraguan padanya; menjadi petunjuk bagi mereka yang bertakwa',
      en: 'This is the Book about which there is no doubt, a guidance for those conscious of Allah',
    },
    meta: { juz: 1, page: 2 },
  },
  {
    surah: 2,
    ayah: 3,
    text: {
      arabic:
        'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنْفِقُونَ',
    },
    translations: {
      id: 'Yaitu mereka yang beriman kepada yang gaib, menegakkan salat, dan menafkahkan sebagian rezeki yang Kami berikan',
      en: 'Who believe in the unseen, establish prayer, and spend out of what We have provided for them',
    },
    meta: { juz: 1, page: 2 },
  },
  {
    surah: 2,
    ayah: 4,
    text: {
      arabic:
        'وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنْزِلَ إِلَيْكَ وَمَا أُنْزِلَ مِنْ قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ',
    },
    translations: {
      id: 'Dan mereka yang beriman kepada Kitab yang diturunkan kepadamu dan Kitab yang diturunkan sebelum kamu, serta mereka yakin akan adanya akhirat',
      en: 'And who believe in what has been revealed to you, and what was revealed before you, and of the Hereafter they are certain [in faith]',
    },
    meta: { juz: 1, page: 2 },
  },
  {
    surah: 2,
    ayah: 5,
    text: {
      arabic:
        'أُولَٰئِكَ عَلَىٰ هُدًى مِنْ رَبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ',
    },
    translations: {
      id: 'Merekalah yang mendapat petunjuk dari Tuhan mereka, dan mereka itulah orang-orang yang beruntung',
      en: 'It is they who will follow guidance from their Lord, and it is they who will be successful',
    },
    meta: { juz: 1, page: 2 },
  },
];

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
