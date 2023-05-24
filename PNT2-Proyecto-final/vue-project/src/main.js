import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createRouter, createWebHistory} from 'vue-router'

import './assets/main.css'

import App from './App.vue'

import Index from './components/views/Index.vue'
import Pokemons from './components/views/Pokemons.vue'
import Pokemon from './components/views/Pokemon.vue'
import Login from './components/views/login.vue'
import Signup from './components/views/signup.vue'
import Terms from './components/views/Terms.vue'



const routes = [
    { path : '/' , component : Index}, 
    { path : '/Pokemons' , component : Pokemons}, 
    { path : '/Pokemon/:id' , component : Pokemon},
    { path : '/login' , component : Login}, 
    { path : '/signup' , component : Signup}, 
    { path : '/Terms' , component : Terms}, 
]

const router = createRouter(
    {
        history : createWebHistory(),
        routes
    }
);
const pinia = createPinia()

createApp(App).use(pinia).use(router).mount('#app')