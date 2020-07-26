import Vue from "vue";
import VueRouter from "vue-router";
import dashboard from "@/views/dashboard.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing-Page",
    component: () => import("../views/landing-page.vue"),
  },
  {
    path: "/home",
    name: "Home-Page",
    component: () => import("../views/home-page.vue"),
  },
  {
    path: "/board/:id",
    name: "Finito-app",
    component: () => import("../views/trellor-app.vue"),
  },
  {
    path: "/login",
    component: () => import("../views/login-page.vue"),
  },
  {
    path: "/signup",
    component: () => import("../views/signup-page.vue"),
  },
  {
    path: "/board/dash/charts",
    component: dashboard,
  },
  {
    path: "*",
    component: () => import("../views/404.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
