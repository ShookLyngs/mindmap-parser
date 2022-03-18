import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

export default createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior(to, from) {
    if (to.name !== from.name) return {
      top: 0
    };
  },
});
