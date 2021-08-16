import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import { RouteNames } from "@/core/enums/route-names.enum";

import Home from "@/views/Home.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Create from "@/pages/Create.vue"

const routes: Array<RouteRecordRaw> = [
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
  {
    path: "/create",
    name: RouteNames.CREATE,
    component: Create,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
