
import { RouteRecordRaw } from "vue-router";
import RouteName from "../enums/route-name.enum";
import SharedRouteName from "@/shared/enums/route-name.enum";

import Login from "../views/login.vue";
import Register from "../views/register.vue";
import Landing from "@/shared/views/landing-page.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/landing",
    name: SharedRouteName.LANDING,
    component: Landing
  },
  {
    path: "/login",
    name: RouteName.LOGIN,
    component: Login
  },
  {
    path: "/register",
    name: RouteName.REGISTER,
    component: Register
  }
];


export default routes;
