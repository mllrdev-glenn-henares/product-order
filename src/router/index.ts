import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import { RouteNames } from "@/core/enums/route-names";

import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: RouteNames.HOME,
    component: Home,
  },
  {
    path: "/login",
    name: RouteNames.LOGIN,
    component: Login,
  },
  {
    path: "/register",
    name: RouteNames.REGISTER,
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
