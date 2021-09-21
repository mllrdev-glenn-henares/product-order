import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import RouteName from "@/core/enums/route-name.enum";

import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Create from "@/pages/Create.vue"
import Landing from "@/pages/Landing.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: {
      name: "Login"
    }
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
  {
    path: "/create",
    name: RouteName.CREATE,
    component: Create,
  },
  {
    path: "/landing",
    name: RouteName.LANDING,
    component: Landing
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = sessionStorage.getItem('TOKEN')

  if (authRequired && !loggedIn) {
    return next('/login')
  }
  next()
})
export default router;
