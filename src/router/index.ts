import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
