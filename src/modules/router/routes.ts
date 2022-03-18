export const routes = [
  {
    path: '/',
    name: 'entry',
    redirect: { name: 'display' },
  },

  {
    path: '/display',
    name: 'display',
    component: () => import('@/views/display/index.vue'),
  },
];
