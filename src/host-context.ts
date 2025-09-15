// src/host-context.ts

export interface HostContext {
  version: string;
  eventBus: EventTarget;
  navigate: (path: string) => void;
}

export const HostContext: HostContext = {
  version: '1.0.0',
  eventBus: new EventTarget(),
  navigate: (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  },
};
