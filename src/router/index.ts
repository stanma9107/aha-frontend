import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../pages/welcome.vue";

const routes = [
  {
    path: '/',
    component: Welcome,
  },
  {
    path: '/dashboard/users',
    component: () => import('../pages/dashboard/users.vue'),
  },
  {
    path: '/dashboard/change-password',
    component: () => import('../pages/dashboard/change-password.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;