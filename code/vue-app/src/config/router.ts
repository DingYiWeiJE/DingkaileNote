import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../pages/Home/Home.vue';
import About from '../pages/About.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/about', component: About }
];

const router = createRouter({
  history: createWebHistory('/EvayPortal/'),
  routes
});

export default router;