import { createApp, ref } from "vue";
import { createPinia, storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import VueLazyload from "vue-lazyload";
import { useLoginStatusStore } from "./stores/State.js";

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
import SelectFirstPokemon from "./components/views/SelectFirstPokemon.vue";
import Error from "./components/views/Error.vue";

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

// Ahora mismo la app utiliza auth y comprueba la sesion pero si se quiere hardcodear una ruta se deslogea y pierde el state./
// Falta armar la vista de Profile para ABM y la de SelectFirstPokemon
const routes = [
	{ path: "/", component: Index},
	{ path: "/Pokemons", component: Pokemons },
	{ path: "/Pokemon/:id", component: Pokemon },
	{ path: "/login", component: Login },
	{ path: "/signup", component: Signup },
	{ path: "/Terms", component: Terms },
	{ path: "/Profile", component: Profile,  meta:{
		requiresAuth: 'true',
	  }},
	{ path: "/Battle", component: Battle, meta:{
		requiresAuth: 'true',
	  }},
	{ path: "/SelectFirstPokemon", component: SelectFirstPokemon, meta:{
		requiresAuth: 'true',
	  }},
	  { path: "/Error", component: Error},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});
const pinia = createPinia();

createApp(App).use(pinia).use(router).use(VueLazyload).mount("#app");


const loginStatusStore = useLoginStatusStore()
const { isLoggedIn } = storeToRefs(loginStatusStore)

console.log("isLoggedIn", loginStatusStore.isLoggedIn)


// Comprueba si el componente necesita login.
router.beforeEach((to, from, next) => {
	const storedLogin = window.sessionStorage.getItem("loginCheck");
	if (to.meta.requiresAuth) {
	  console.log("Router", storedLogin)
	  if (!storedLogin) {
		next({
		  path: '/Error'
		})
	  } else {
		next()
	  }
	} else {
	  next()
	}
  })