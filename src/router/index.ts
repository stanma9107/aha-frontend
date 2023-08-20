import { createRouter, createWebHistory } from "vue-router";
import NonLogin from "../pages/non-login.vue";

const routes = [
  {
    path: '/',
    component: NonLogin,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;