// scripts/saveChapters.ts

import {
  fetchChapters,
  fetchChapterById,
  fetchVersesByChapterId,
} from './fetchChapters.ts';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helpers untuk log berwarna
const log = {
  info: (msg: string) => console.log(`\x1b[36mℹ️  INFO:\x1b[0m ${msg}`),
  success: (msg: string) => console.log(`\x1b[32m✅ SUCCESS:\x1b[0m ${msg}`),
  warn: (msg: string) => console.warn(`\x1b[33m⚠️  WARN:\x1b[0m ${msg}`),
  error: (msg: string) => console.error(`\x1b[31m❌ ERROR:\x1b[0m ${msg}`),
};

async function saveChapters() {
  try {
    const args = process.argv.slice(2);
    const outputPath = join(
      __dirname,
      '../packages/quran-data/public/chapters.json'
    );

    log.info(`Output file → ${outputPath}`);

    if (args.length > 0) {
      const id = parseInt(args[0], 10);

      if (args[1] === 'verses') {
        const perPage = args[2] ? parseInt(args[2], 10) : undefined;
        const page = args[3] ? parseInt(args[3], 10) : undefined;

        log.info(
          `Fetching verses for chapter ${id} (perPage=${
            perPage || 'ALL'
          }, page=${page || 1})`
        );

        const result = await fetchVersesByChapterId(id, perPage, page);

        writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');
        log.success(
          `Saved ${result.verses.length} verses from chapter ${id} (page=${result.meta.current_page}/${result.meta.total_pages})`
        );
      } else {
        log.info(`Fetching chapter metadata for id=${id}`);
        const chapter = await fetchChapterById(id);
        writeFileSync(outputPath, JSON.stringify(chapter, null, 2), 'utf-8');
        log.success(`Saved chapter ${id} (${chapter.name_simple})`);
      }
    } else {
      log.info(`Fetching all chapters metadata`);
      const chapters = await fetchChapters();
      writeFileSync(outputPath, JSON.stringify(chapters, null, 2), 'utf-8');
      log.success(`Saved ${chapters.length} chapters`);
    }
  } catch (err: any) {
    log.error(
      `Failed with error: ${
        err.response
          ? JSON.stringify(err.response, null, 2)
          : err.message || err
      }`
    );
    process.exit(1);
  }
}

saveChapters();
