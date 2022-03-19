import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { routes } from './routes';

export default createRouter({
  routes: (routes as RouteRecordRaw[]),
  history: createWebHistory(),
  scrollBehavior(to, from) {
    if (to.name !== from.name) return {
      top: 0
    };
  },
});
