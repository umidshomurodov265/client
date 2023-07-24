import { createRouter, createWebHistory } from "vue-router";
// import Cookies from "js-cookie";
import ExploreView from "../layouts/ExploreView.vue";
import LandingView from "../layouts/LandingView.vue";

// Explore in

import AccountView from "../views/Explore/AccountView.vue";
import Table from "../views/Explore/Table.vue";
import TelegramBot from "../views/Explore/TelegramBot.vue";

import Registration from "../views/Landing/Registration.vue";
import LoginView from "../views/Landing/LoginView.vue";
import IndexView from "../views/Landing/IndexView.vue";
import NotFound from "../views/Explore/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: LandingView,
    children: [
      {
        path: "",
        name: "Index",
        component: IndexView,
      },
      {
        path: "registration",
        name: "Registration",
        component: Registration,
      },

      {
        path: "login",
        name: "Login",
        component: LoginView,
      },
    ],
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem("AccessToken"))) {
        window.location.href = "/explore";
      } else {
        next();
      }
    },
  },
  {
    path: "/explore",
    name: "Explore",
    component: ExploreView,
    children: [
      {
        path: "",
        name: "Table",
        component: Table,
      },
      {
        path: "telegram_bot",
        name: "TelegramBot",
        component: TelegramBot,
      },

      // Account

      {
        path: "account",
        name: "AccountView",
        component: AccountView,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
