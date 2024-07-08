import { createMemoryHistory, createRouter } from "vue-router";

import DoctorsView from "../views/DoctorsView.vue";
import PatientsList from "../components/PatientsList.vue";
import Secretaries from "@/components/Secretaries.vue";
import Home from "@/components/Home.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/doctors", component: DoctorsView },
  { path: "/patients", component: PatientsList },
  { path: "/secretaries", component: Secretaries },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
