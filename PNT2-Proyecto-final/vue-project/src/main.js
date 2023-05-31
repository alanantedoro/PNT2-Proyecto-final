import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import VueLazyload from "vue-lazyload";

import "./assets/main.css";

import App from "./App.vue";

import Index from "./components/views/Index.vue";
import Pokemons from "./components/views/Pokemons.vue";
import Pokemon from "./components/views/Pokemon.vue";
import Login from "./components/views/login.vue";
import Signup from "./components/views/signup.vue";
import Terms from "./components/views/Terms.vue";
import Profile from "./components/views/Profile.vue";
import Battle from "./components/views/Battle.vue";

import MonomaniacOneRegular from "@/fonts/MonomaniacOne-Regular.ttf";

// Agrega esta línea para definir la fuente
const fontStyles = document.createElement("style");
fontStyles.textContent = `
  @font-face {
    font-family: 'MonomaniacOneRegular';
    src: url(${MonomaniacOneRegular}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;
document.head.appendChild(fontStyles);

const routes = [
	{ path: "/", component: Index },
	{ path: "/Pokemons", component: Pokemons },
	{ path: "/Pokemon/:id", component: Pokemon },
	{ path: "/login", component: Login },
	{ path: "/signup", component: Signup },
	{ path: "/Terms", component: Terms },
	{ path: "/Profile", component: Profile },
	{ path: "/Battle", component: Battle },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});
const pinia = createPinia();

createApp(App).use(pinia).use(router).use(VueLazyload).mount("#app");
