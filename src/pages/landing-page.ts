// src/pages/landing-page.ts

import { LitElement, html, css } from 'lit';

export class LandingPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: 'Inter', system-ui, sans-serif;
      color: #f9fafb;
      background: radial-gradient(circle at top center, #1e293b, #0f172a);
      min-height: 100vh;
      position: relative;
      overflow: hidden;
    }

    /* Decorative glowing stars */
    :host::before,
    :host::after {
      content: '';
      position: absolute;
      border-radius: 50%;
      filter: blur(100px);
      opacity: 0.5;
      z-index: 0;
    }

    :host::before {
      width: 300px;
      height: 300px;
      top: -50px;
      left: -50px;
      background: #ffd70033;
    }

    :host::after {
      width: 400px;
      height: 400px;
      bottom: -100px;
      right: -100px;
      background: #22d3ee33;
    }

    header {
      text-align: center;
      padding: 4rem 1rem 3rem;
      position: relative;
      z-index: 1;
    }

    header h1 {
      font-size: 3rem;
      color: #ffd700;
      margin: 0.5rem 0;
      text-shadow: 0 0 12px rgba(255, 215, 0, 0.6);
    }

    header p {
      font-size: 1.25rem;
      color: #e2e8f0;
      margin-bottom: 2rem;
    }

    .btn {
      background: linear-gradient(90deg, #ffd700, #facc15);
      color: #1e293b;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 9999px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      margin: 0 0.5rem;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
    }

    .section {
      padding: 2rem 1rem;
      max-width: 1000px;
      margin: 0 auto;
      text-align: center;
      position: relative;
      z-index: 1;
    }

    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }

    .feature-card {
      background: #1e293b;
      padding: 1.5rem 1rem;
      border-radius: 1rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
      border: 1px solid #334155;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .feature-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
      border-color: #ffd700aa;
    }

    .feature-card h3 {
      color: #ffd700;
      margin: 0.5rem 0;
      font-size: 1.2rem;
    }

    footer {
      text-align: center;
      padding: 2rem 1rem;
      font-size: 0.875rem;
      color: #94a3b8;
      border-top: 1px solid #334155;
      margin-top: 2rem;
      position: relative;
      z-index: 1;
    }
  `;

  private navigate(path: string) {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  render() {
    return html`
      <header>
        <h1>🌟 Padhang Huda</h1>
        <p>The Light of Guidance – Cahaya Petunjuk</p>
        <button class="btn" @click=${() => this.navigate('/quran')}>
          🚀 Mulai Gunakan
        </button>
        <button class="btn" @click=${() => this.navigate('/about')}>
          ℹ️ Pelajari Lebih Lanjut
        </button>
      </header>

      <section class="section">
        <h2>🎯 Mengapa Padhang Huda?</h2>
        <p>
          Aplikasi Qur’an & Hadis modern berbasis sumber terpercaya, mendukung
          offline-first, dan fleksibel dengan sistem plugin.
        </p>
      </section>

      <section class="section">
        <h2>✨ Fitur Utama</h2>
        <div class="features">
          <div class="feature-card">
            <h3>📖 Qur’an</h3>
            <p>Teks Arab, terjemahan, tafsir, dan audio qari.</p>
          </div>
          <div class="feature-card">
            <h3>📜 Hadith</h3>
            <p>Koleksi Kutub al-Tis’ah dengan metadata lengkap.</p>
          </div>
          <div class="feature-card">
            <h3>🔌 Plugin</h3>
            <p>Tambahkan modul baru tanpa rebuild host.</p>
          </div>
          <div class="feature-card">
            <h3>📱 Offline</h3>
            <p>Akses Qur’an & Hadis tanpa internet dengan SQLite.</p>
          </div>
        </div>
      </section>

      <footer>© 2025 Padhang Huda – The Light of Guidance</footer>
    `;
  }
}

customElements.define('landing-page', LandingPage);
