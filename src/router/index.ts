import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Planned from '../views/Planned.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/planned',
    name: 'planned',
    component: Planned,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
