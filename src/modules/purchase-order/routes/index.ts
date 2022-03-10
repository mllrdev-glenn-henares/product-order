
import { RouteRecordRaw } from "vue-router";
import RouteName from "@/modules/purchase-order/enums/route-name.enum";
import SharedRouteName  from '@/shared/enums/route-name.enum';

import Home from "../views/home.vue";
import Create from "../views/create.vue";
import View from "../views/view-order.vue";
import Edit from "../views/edit.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: {
      name: SharedRouteName.LANDING
    }
  },
  {
    path: "/home",
    name: RouteName.HOME,
    component: Home,
  },
  {
    path: "/create",
    name: RouteName.CREATE,
    component: Create,
  },
  {
    path: "/view/:orderId",
    name: RouteName.VIEW,
    component: View
  },
  {
    path: "/edit/:orderId",
    name: RouteName.EDIT,
    component: Edit
  }
];


export default routes;
