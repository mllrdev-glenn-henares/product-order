import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import { RouteName } from "@/core/enums/route-name.enum";

import Home from "@/views/Home.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/home",
    name: RouteName.HOME,
    component: Home,
  },
  {
    path: "/login",
    name: RouteName.LOGIN,
    component: Login,
  },
  {
    path: "/register",
    name: RouteName.REGISTER,
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
