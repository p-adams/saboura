import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Main",
      component: () => import("@/components/Main")
    },
    {
      path: "/whiteboard/:id",
      name: "Whiteboard",
      component: () => import("@/components/main-whiteboard"),
      props: true
    },
    {
      path: "/about",
      name: "About",
      component: () => import("@/components/about")
    },
    {
      path: "/user-account",
      name: "Account",
      component: () => import("@/components/user-account")
    },
    {
      path: "/user-admin",
      name: "Admin",
      component: () => import("@/components/user-admin")
    },
    {
      path: "/dashboard-page",
      name: "DashboardPage",
      component: () => import("@/components/dashboard-page")
    },
    {
      path: "/whiteboard-app",
      name: "WhiteboardApp",
      component: () => import("@/components/whiteboard-app")
    },
    {
      path: "/user-registration",
      name: "UserRegistration",
      component: () => import("@/components/user-registration")
    },
    {
      path: "/user-login",
      name: "UserLogin",
      component: () => import("@/components/user-login")
    }
  ]
});
