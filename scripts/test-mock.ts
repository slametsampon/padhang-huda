// scripts/test-mock.ts

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM compatible __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const chaptersPath = path.resolve(
  __dirname,
  '../packages/quran-data/public/chapters.json'
);
const verses1Path = path.resolve(
  __dirname,
  '../packages/quran-data/public/verses-surah-1.json'
);
const verses2Path = path.resolve(
  __dirname,
  '../packages/quran-data/public/verses-surah-2.json'
);

function loadJson(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

console.log('=== Testing Quran Mock JSON ===');

const chapters = loadJson(chaptersPath);
console.log('Chapters count:', chapters.chapters.length);
console.log('First chapter:', chapters.chapters[0]);

const verses1 = loadJson(verses1Path);
console.log('Surah 1 verse count:', verses1.verses.length);
console.log('First verse (1:1):', verses1.verses[0].text_uthmani);

const verses2 = loadJson(verses2Path);
console.log('Surah 2 verse count:', verses2.verses.length);
console.log('First verse (2:1):', verses2.verses[0].text_uthmani);

console.log('=== All tests passed if counts > 0 and texts are correct ===');
