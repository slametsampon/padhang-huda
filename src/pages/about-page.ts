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

      <blockquote>
        <b>Padhang Huda – The Light of Guidance</b> adalah aplikasi Qur’an &
        Hadis modern, ringan, dan fleksibel, untuk belajar dan mengamalkan
        ajaran Islam berdasarkan sumber terpercaya, baik online maupun offline.
      </blockquote>
    `;
  }
}
