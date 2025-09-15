// src/router.ts

import { Router } from '@vaadin/router';
import type { Route } from '@vaadin/router';
import './components/views/not-found-view';

let router: Router | null = null;

export function initRouter(outlet: HTMLElement) {
  router = new Router(outlet);
}

export function setRoutes(routes: Route[]) {
  if (!router) throw new Error('Router not initialized');
  router.setRoutes([
    ...routes,
    { path: '/', redirect: '/quran' },
    { path: '(.*)', component: 'not-found-view' },
  ]);
}
