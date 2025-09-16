// src/router.ts

import { Router } from '@vaadin/router';
import type { Route } from '@vaadin/router';
import './components/views/not-found-view';
import './pages/landing-page';
import './pages/about-page';

let router: Router | null = null;

export function initRouter(outlet: HTMLElement) {
  router = new Router(outlet);
}

export function setRoutes(routes: Route[]) {
  if (!router) throw new Error('Router not initialized');
  router.setRoutes([
    { path: '/', component: 'landing-page' }, // ✅ landing sebagai root
    ...routes,
    { path: '/about', component: 'about-page' }, // ✅ about di-host
    { path: '(.*)', component: 'not-found-view' },
  ]);
}
