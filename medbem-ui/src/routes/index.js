import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "../views/HomeView.vue";
import DoctorsView from "../views/DoctorsView.vue";
import PatientsView from "../views/PatientsView.vue";
import SecretariesView from "../views/SecretariesView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/doctors", component: DoctorsView },
  { path: "/patients", component: PatientsView },
  { path: "/secretaries", component: SecretariesView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
