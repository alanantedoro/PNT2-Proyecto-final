<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onMounted, provide, ref } from "vue";
import { usuariosStore } from "../src/stores/Users.js";

const userStore = usuariosStore();
const userObject = ref(null);

function logout() {
	userStore.logout();
	userObject.value = null;
}

onMounted(() => {
	const storedUserObject = window.sessionStorage.getItem("userObject");
	if (storedUserObject) {
		userObject.value = JSON.parse(storedUserObject);
	}
});

provide("userObject", userObject);
</script>

<template>
	<nav class="navbar navbar-expand-lg bg-body-tertiary">
		<div class="container-fluid">
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item custom-font">
						<RouterLink to="/" class="link-navbar">Index</RouterLink>
					</li>
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>
					<li class="nav-item">
						<RouterLink to="/Pokemons" class="link-navbar">Pokemons</RouterLink>
					</li>
				</ul>
				<ul class="navbar-nav nav-items-right">
					<li class="nav-item" v-if="userObject">
						<RouterLink to="/Profile" class="link-navbar">{{
							userObject.username
						}}</RouterLink>
					</li>
					<li class="nav-item" v-if="userObject">
						<RouterLink to="/" class="link-navbar" @click="logout()"
							>Logout</RouterLink
						>
					</li>
					<li class="nav-item" v-if="userObject === null">
						<RouterLink to="/login" class="link-navbar">Login</RouterLink>
					</li>
					<li class="nav-item" v-if="userObject === null">
						<RouterLink to="/signup" class="link-navbar">Signup</RouterLink>
					</li>
				</ul>
			</div>
		</div>
	</nav>
	<RouterView></RouterView>
	<footer class="footer">
		<div class="container">
			Este es el footer de la página. Aquí puedes agregar cualquier contenido
			adicional que desees.
			<RouterLink to="/terms" class="link-footer"
				>Términos y condiciones</RouterLink
			>
		</div>
	</footer>
</template>

<style scoped>
@font-face {
	font-family: "MonomaniacOneRegular";
	src: url("~@/fonts/MonomaniacOne-Regular.ttf");
}

.custom-font {
	font-family: "MonomaniacOneRegular", sans-serif;
}
.nav-item {
	padding: 10px;
}

.bg-body-tertiary {
	background-color: #dc143c !important;
}

.link-navbar {
	color: black !important;
	font-size: large;
	font-weight: 600;
}

.link-navbar:hover {
	color: blue !important;
}

.nav-items-right {
	justify-content: flex-end !important;
}

.footer {
	background-color: #2a27fa;
}
</style>
