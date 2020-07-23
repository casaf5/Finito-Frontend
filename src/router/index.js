import Vue from "vue";
import VueRouter from "vue-router";
import landingPage from "../views/landing-page.vue";
import trellorApp from "../views/trellor-app.vue";
import homePage from "../views/home-page.vue";
import Edit from "../views/comp-to-edit.vue";
import dashboard from "@/views/dashboard.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing-Page",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/landing-page.vue"),
  },
  {
    path: "/home",
    // name: 'Landing-Page',
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/home-page.vue"),
  },
  {
    path: "/board/:id",
    name: "Trellor-app",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/trellor-app.vue"),
  },
  {
    path: "/edit",
    component: Edit,
  },
  {
    path: "/board/dash/charts",
    component: dashboard,
  },
  {
    path: "*",
    component: () => import(/* webpackChunkName: "about" */ "../views/404.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
