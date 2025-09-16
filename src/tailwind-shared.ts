// src/tailwind-shared.ts

export const tailwindSheet = new CSSStyleSheet();

(async () => {
  try {
    const res = await fetch('/tailwind.css');
    if (!res.ok) {
      console.error(
        '[Tailwind] Gagal load /tailwind.css:',
        res.status,
        res.statusText
      );
      return;
    }

    const css = await res.text();
    console.log('[Tailwind] CSS loaded, length =', css.length);

    await tailwindSheet.replace(css);
    console.log('[Tailwind] adoptedStyleSheets updated successfully');
  } catch (err) {
    console.error('[Tailwind] Error loading CSS:', err);
  }
})();
