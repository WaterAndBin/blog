import type { RouterConfig } from '@nuxt/schema';

export default {
  routes: (_routes) => [
    {
      path: '/',
      redirect: '/home',
      component: async () => await import('~/pages/home/index.vue')
    },
    {
      name: 'home',
      path: '/home',
      component: async () => await import('~/pages/home/index.vue')
    },
    ..._routes
  ]
} as const as RouterConfig;
