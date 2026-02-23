import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LandingPage from "../views/LandingPage.vue";
import AboutPage from "../views/AboutPage.vue";
import LeaderboardPage from "../views/LeaderboardPage.vue";
import ContactPage from "../views/ContactPage.vue";
import LoginPage from "../views/LoginPage.vue";

const routes: RouteRecordRaw[] = [
    { path: "/", name: "Landing", component: LandingPage },
    { path: "/About", name: "About", component: AboutPage },
    { path: "/Leaderboard", name: "Leaderboard", component: LeaderboardPage },
    { path: "/Contact", name: "Contact", component: ContactPage },
    { path: "/Login", name: "Login", component: LoginPage }

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
