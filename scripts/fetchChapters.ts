// scripts/fetchChapters.ts

import { getAccessToken } from './auth.ts';

export interface Chapter {
  id: number;
  name_simple: string;
  name_arabic: string;
  revelation_place: string;
  verses_count: number;
}

export interface Verse {
  id: number;
  verse_key: string; // contoh: "2:255"
  text_uthmani: string;
  text_imlaei: string;
}

interface VerseApiResponse {
  verses: Verse[];
  meta: {
    per_page: number;
    current_page: number;
    total_pages: number;
    total_records: number;
  };
}

const log = {
  info: (msg: string) => console.log(`\x1b[36mℹ️  INFO:\x1b[0m ${msg}`),
  success: (msg: string) => console.log(`\x1b[32m✅ SUCCESS:\x1b[0m ${msg}`),
  error: (msg: string) => console.error(`\x1b[31m❌ ERROR:\x1b[0m ${msg}`),
};

const baseUrl =
  process.env.QURAN_API_CONTENT_URL ||
  'https://apis-prelive.quran.foundation/content/api/v4';

export async function fetchChapters(): Promise<Chapter[]> {
  const token = await getAccessToken();
  log.info('Fetching all chapters');

  const response = await fetch(`${baseUrl}/chapters`, {
    headers: {
      'x-auth-token': token,
      'x-client-id': process.env.QURAN_API_CLIENT_ID!,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    log.error(
      `Failed to fetch chapters: ${response.status} ${response.statusText}`
    );
    log.error(`Response: ${body}`);
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  log.success(`Fetched ${data.chapters.length} chapters`);
  return data.chapters as Chapter[];
}

export async function fetchChapterById(id: number): Promise<Chapter> {
  const token = await getAccessToken();
  log.info(`Fetching chapter metadata (id=${id})`);

  const response = await fetch(`${baseUrl}/chapters/${id}`, {
    headers: {
      'x-auth-token': token,
      'x-client-id': process.env.QURAN_API_CLIENT_ID!,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    log.error(
      `Failed to fetch chapter ${id}: ${response.status} ${response.statusText}`
    );
    log.error(`Response: ${body}`);
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  log.success(
    `Fetched chapter ${data.chapter.name_simple} (${data.chapter.verses_count} verses)`
  );
  return data.chapter as Chapter;
}

export async function fetchVersesByChapterId(
  id: number,
  perPage?: number,
  page?: number
): Promise<VerseApiResponse> {
  const token = await getAccessToken();

  const params = new URLSearchParams();
  if (perPage) params.append('per_page', perPage.toString());
  if (page) params.append('page', page.toString());

  const url = `${baseUrl}/chapters/${id}/verses${
    params.toString() ? `?${params.toString()}` : ''
  }`;

  log.info(`Fetching verses from chapter ${id} (${url})`);

  const response = await fetch(url, {
    headers: {
      'x-auth-token': token,
      'x-client-id': process.env.QURAN_API_CLIENT_ID!,
    },
  });

  if (!response.ok) {
    const body = await response.text();
    log.error(
      `Failed to fetch verses: ${response.status} ${response.statusText}`
    );
    log.error(`Response: ${body}`);
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  log.success(
    `Fetched ${data.verses.length} verses (page ${data.meta.current_page}/${data.meta.total_pages})`
  );
  return data as VerseApiResponse;
}
