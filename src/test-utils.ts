// test-utils.ts

/**
 * Flush microtask queue (resolve promise segera).
 * Berguna untuk menunggu Lit requestUpdate -> render commit.
 */
export async function flush() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}
