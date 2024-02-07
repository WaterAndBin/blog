import type { RouterConfig } from '@nuxt/schema';

export default {
  routes: (_routes) => [
    // {
    //   path: '/',
    //   redirect: '/editor',
    //   component: async () => await import('~/pages/index.vue')
    // },
    // {
    //   name: 'editor',
    //   path: '/editor',
    //   component: async () => await import('~/pages/index.vue')
    // },
    ..._routes
  ]
} as const as RouterConfig;
