import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import RouteName from "@/core/enums/route-name.enum";

import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Create from "@/pages/Create.vue";
import View from "@/pages/ViewOrder.vue";
import Landing from "@/pages/Landing.vue";
import Edit from "@/pages/Edit.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: {
      name: RouteName.LANDING
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
  },
  {
    path: "/view/:orderId",
    name: RouteName.VIEW,
    component: View
  },
  {
    path: "/Edit/:orderId",
    name: RouteName.EDIT,
    component: Edit
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register','/landing']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = sessionStorage.getItem('TOKEN')

  if (authRequired && !loggedIn) {
    return next('/landing')
  }
  next()
})
export default router;
