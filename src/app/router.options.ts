import type { RouterConfig } from '@nuxt/schema';

export default {
  routes: (_routes) => [
    {
      path: '/',
      redirect: '/text',
      component: async () => await import('~/pages/text/index.vue')
    },
    ..._routes
  ]
} as const as RouterConfig;
