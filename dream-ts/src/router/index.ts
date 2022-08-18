import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    redirect:"/default",
    children: [
      {
        path: "/default",
        name: "default",
        component: () => import("../views/DefaultView.vue"),
      },
      {
        path: "/vip",
        name: "vip",
        component: () => import("../views/VipView.vue"),
      },
      {
        path: "/supplier",
        name: "supplier",
        component: () => import("../views/SupplierView.vue"),
      },
      {
        path: "/goods",
        name: "goods",
        component: () => import("../views/GoodsView.vue"),
      },
      {
        path: "/staff",
        name: "staff",
        component: () => import("../views/StaffView.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from) => {
  const token = sessionStorage.getItem("token");
  if (to.path != "/login" && !token) {
    return "/login";
  }
  if (to.path == "/login") {
    sessionStorage.removeItem("token");
    return;
  }
});

export default router;
