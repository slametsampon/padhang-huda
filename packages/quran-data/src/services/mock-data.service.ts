// packages/quran-data/src/services/mock-data.service.ts

import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Generic function to fetch mock JSON data from /public/
 * @param filename - Name of the mock file, e.g. "daftar-surat.json"
 * @returns Parsed JSON as type T
 */
export async function fetchMockData<T>(filename: string): Promise<T> {
  const isNode = typeof process !== 'undefined' && !!process.versions?.node;
  const relativePath = `/public/${filename}`;

  console.log(
    `📥 [fetchMockData] Fetching mock data: ${relativePath} (isNode=${isNode})`
  );

  try {
    if (isNode) {
      // Saat running di Node.js (Vitest/Jest)
      const absPath = path.resolve(__dirname, '../../public', filename);
      console.log(`📖 Membaca file lokal: ${absPath}`);
      const text = await fs.readFile(absPath, 'utf-8');
      const data = JSON.parse(text);
      console.log(
        `✅ [fetchMockData] Loaded ${filename}, items:`,
        Object.keys(data)
      );
      return data as T;
    } else {
      // Saat running di browser (Vite serve expose /public/)
      const res = await fetch(relativePath);
      console.log(`[fetchMockData] Response status: ${res.status}`);

      if (!res.ok) {
        throw new Error(
          `❌ Gagal fetch mock data: ${relativePath} → ${res.status} ${res.statusText}`
        );
      }

      return (await res.json()) as T;
    }
  } catch (err) {
    console.error(`❌ [fetchMockData] Gagal memuat file ${filename}:`, err);
    throw err;
  }
}
