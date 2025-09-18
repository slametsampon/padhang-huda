// src/pages/about-page.ts
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('about-page')
export class AboutPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 2rem;
      font-family: system-ui, sans-serif;
      line-height: 1.6;
      color: #1e293b;
      background: #f9fafb;
    }

    h2,
    h3 {
      color: #0f172a;
      margin-top: 1.5rem;
      margin-bottom: 0.5rem;
    }

    section {
      margin-bottom: 2rem;
    }

    ul {
      margin: 0.5rem 0 1.5rem 1.25rem;
    }

    li {
      margin-bottom: 0.25rem;
    }

    blockquote {
      border-left: 4px solid #0ea5e9;
      padding-left: 1rem;
      margin: 1rem 0;
      font-style: italic;
      color: #334155;
      background: #e0f2fe;
      border-radius: 0.5rem;
    }

    .card {
      background: white;
      border-radius: 0.75rem;
      padding: 1rem 1.25rem;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
      margin-bottom: 1rem;
    }

    .card h4 {
      margin: 0 0 0.5rem 0;
      font-size: 1.05rem;
      color: #0369a1;
    }

    .card ul {
      margin: 0.5rem 0 0 1.25rem;
    }

    a {
      color: #0ea5e9;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  `;

  render() {
    return html`
      <section>
        <h2>🌟 Tentang Padhang Huda</h2>
        <p><b>Padhang Huda (پدهڠ هدى)</b> berarti <i>Cahaya Petunjuk</i>.</p>
        <p>
          Aplikasi ini hadir untuk menyediakan platform Qur’an & Hadis modern,
          berbasis sumber terpercaya, mendukung <i>offline-first</i>, serta
          dapat diperluas dengan plugin.
        </p>
      </section>

      <section>
        <h3>📖 Qur’an</h3>
        <ul>
          <li>Mushaf Utsmani dengan teks Arab</li>
          <li>Terjemahan multi-bahasa</li>
          <li>Tafsir klasik & kontemporer</li>
          <li>Audio per ayat (multi qari)</li>
          <li>Tajwid highlight, bookmark & catatan</li>
          <li>Doa & dzikir</li>
          <li>Offline-first dengan SQLite</li>
        </ul>

        <h3>🕋 Hadis</h3>
        <ul>
          <li>Koleksi Kutub al-Tis’ah</li>
          <li>Teks Arab + terjemahan</li>
          <li>Metadata sanad & derajat</li>
          <li>Pencarian cepat</li>
          <li>Tarjih Muhammadiyah (HPT)</li>
        </ul>

        <h3>🔎 Umum</h3>
        <ul>
          <li>Pencarian ayat & hadis</li>
          <li>Navigasi surah/juz/bab</li>
          <li>Sistem plugin dinamis</li>
          <li>Dark mode & tema UI</li>
        </ul>
      </section>

      <section>
        <h3>⚙️ Teknologi</h3>
        <ul>
          <li>SPA dengan Vite + TypeScript + LitElement</li>
          <li>Dynamic plugin loader via <code>plugins.json</code></li>
          <li>SQLite WASM offline-first</li>
          <li>GitHub Pages + CDN untuk distribusi</li>
          <li>ESLint + Prettier + Vitest/Playwright</li>
        </ul>
      </section>

      <section>
        <h3>✨ Keunggulan</h3>
        <ul>
          <li>Modular & ekstensibel</li>
          <li>Offline-first</li>
          <li>Validitas konten</li>
          <li>Ringan & cepat</li>
          <li>Komunitas-friendly</li>
        </ul>
      </section>

      <section>
        <h3>🌐 Resources Data</h3>

        <div class="card">
          <h4>📖 Qur’an</h4>
          <ul>
            <li>
              <a href="https://api.quran.com" target="_blank">Quran.com API</a>
              – teks, tafsir, audio, metadata
            </li>
            <li>
              <a href="https://equran.id/apidev" target="_blank">equran.id</a> –
              teks, tafsir, doa, dzikir
            </li>
            <li>
              <a href="https://alquran.cloud" target="_blank">alquran.cloud</a>
              – teks + terjemahan sederhana
            </li>
            <li>
              <a href="http://corpus.quran.com" target="_blank"
                >QuranicCorpus</a
              >
              – morfologi & word-by-word
            </li>
            <li>
              <a href="http://everyayah.com" target="_blank">Everyayah.com</a> –
              audio qari
            </li>
          </ul>
        </div>

        <div class="card">
          <h4>🕋 Hadis</h4>
          <ul>
            <li>
              <a href="https://github.com/gadingnst/hadith-api" target="_blank"
                >Hadith API (GadingNST)</a
              >
              – Arab + terjemahan ID
            </li>
            <li>
              <a href="https://sunnah.com" target="_blank">Sunnah.com API</a> –
              koleksi hadis lengkap
            </li>
            <li>
              <a href="https://hadithapi.com" target="_blank">HadithAPI.com</a>
              – multilingual
            </li>
            <li>
              <a
                href="https://dataverse.telkomuniversity.ac.id/"
                target="_blank"
                >Dataset Telkom Univ</a
              >
              – Bukhari bertema
            </li>
            <li>
              <a
                href="https://www.kaggle.com/datasets/fahd09/hadith-dataset"
                target="_blank"
                >SanadSet (Kaggle)</a
              >
              – analisis sanad
            </li>
          </ul>
        </div>
      </section>

      <blockquote>
        <b>Padhang Huda – The Light of Guidance</b> adalah aplikasi Qur’an &
        Hadis modern, ringan, dan fleksibel, untuk belajar dan mengamalkan
        ajaran Islam berdasarkan sumber terpercaya, baik online maupun offline.
      </blockquote>
    `;
  }
}
