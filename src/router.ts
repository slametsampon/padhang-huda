// src/router.ts

export type RouteHandler = (params?: Record<string, string>) => void;

const routes: Record<string, RouteHandler> = {};

export function registerRoute(path: string, handler: RouteHandler) {
  console.log(`📝 Route registered: ${path}`);
  routes[path] = handler;
}

export function startRouter() {
  window.addEventListener('popstate', () => {
    handleRoute(location.pathname);
  });
  handleRoute(location.pathname);
}

function handleRoute(path: string) {
  console.log(`➡️ Navigating to: ${path}`);
  const handler = routes[path];
  if (handler) {
    console.log(`✅ Handler found for: ${path}`);
    handler();
  } else {
    if (path === '/') {
      console.log('🔀 Fallback: redirecting / → /quran');
      window.history.replaceState({}, '', '/quran');
      handleRoute('/quran');
    } else {
      console.warn('⚠️ Route not found:', path);
    }
  }
}
