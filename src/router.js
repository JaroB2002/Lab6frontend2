import { createRouter, createWebHashHistory } from 'vue-router';
import UpdateStats from './UpdateStats.vue';
import Scoreboard from './Scoreboard.vue';

const routes = [
  { path: '/router' },
  { path: '/', component: Scoreboard },
  { path: '/updatestats', component: UpdateStats },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
