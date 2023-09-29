import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "./components/Home";
import StudentsView from "./components/Students";
import LoginView from "./components/Login";
import HelpView from "./components/Help";
import ArchiveView from "./components/Archive";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HomeView },
  { path: "/students", component: StudentsView },
  { path: "/login", component: LoginView },
  { path: "/help", component: HelpView },
  { path: "/archive", component: ArchiveView },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
