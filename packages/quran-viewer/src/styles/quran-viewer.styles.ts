// packages/quran-viewer/src/styles/quran-viewer.styles.ts

import { css } from 'lit';

export const viewerStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Amiri&display=swap');

  .layout {
    display: flex;
    height: 100vh;
    position: relative; /* supaya overlay bisa absolute di dalam */
    font-family: system-ui, sans-serif;
  }

  quran-left-panel {
    width: 250px;
    background: #fdfdfd;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 0.75rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    z-index: 0; /* pastikan di atas overlay */
  }

  quran-right-panel {
    flex: 1;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 1.25rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    min-height: 300px; /* biar nggak mepet */
  }

  @media (max-width: 800px) {
    :host([usepanels]) .layout {
      grid-template-columns: 1fr;
    }

    quran-left-panel {
      margin-bottom: 1rem;
    }
  }

  /* === Typography === */
  h2 {
    margin-top: 0;
    font-size: 1.3rem;
    text-align: center;
  }

  .ayah {
    font-family: 'Amiri', serif;
    font-size: 2rem;
    line-height: 2.5rem;
    direction: rtl;
    text-align: right;
    margin-bottom: 0.75rem;
  }

  .translation {
    color: #333;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .nav-buttons {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  button {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    background: #f9f9f9;
    cursor: pointer;
    transition: background 0.2s ease, box-shadow 0.2s ease;
  }

  button:hover {
    background: #eee;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  }
`;
