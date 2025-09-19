// packages/quran-viewer/src/styles/quran-viewer.styles.ts

import { css } from 'lit';

export const viewerStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Amiri&display=swap');
  :host {
    display: block;
    padding: 1rem;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-family: system-ui, sans-serif;
    max-width: 700px;
    margin: auto;
  }

  h2 {
    margin-top: 0;
    font-size: 1.25rem;
    text-align: center;
  }

  .ayah {
    font-family: 'Amiri', serif;
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
    direction: rtl;
    text-align: right;
    line-height: 2.25rem;
  }

  .translation {
    color: #333;
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .not-found {
    color: #900;
    font-style: italic;
    text-align: center;
  }

  .loading {
    text-align: center;
    font-style: italic;
    color: #555;
  }

  .nav-buttons {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin-top: 1rem;
  }

  button {
    padding: 0.4rem 0.9rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  button:hover {
    background: #eee;
  }

  .search-results {
    margin-top: 1rem;
  }

  .result {
    padding: 0.5rem;
    border-bottom: 1px solid #ddd;
  }

  .result .ayah {
    font-size: 1.25rem;
  }

  .highlight {
    background-color: yellow;
    padding: 0 2px;
    border-radius: 2px;
  }

  .result-actions {
    margin-top: 0.3rem;
    text-align: right;
  }

  .result-actions button {
    font-size: 0.8rem;
    padding: 0.2rem 0.5rem;
  }

  @media (max-width: 600px) {
    :host {
      padding: 0.5rem;
    }

    .ayah {
      font-size: 1.5rem;
    }

    .translation {
      font-size: 0.9rem;
    }
  }
`;
