<script>
import { usuariosStore } from "../../stores/Users.js";
import { inject } from "vue";

export default {
	data() {
		return {
			pokemons: [],
			placeholderImage: "/favicon.png",
		};
	},
	created: async function () {
		const storedUserObject = window.sessionStorage.getItem("userObject");
		if (storedUserObject) {
			let userObject = JSON.parse(storedUserObject);
			const pokeIds = userObject.pokedex.split(",");
			for (const id of pokeIds) {
				const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
				this.pokemons.push(await response.json());
			}
			this.pokemons.sort((a, b) => a.id - b.id);
		} else {
			router.push("/login");
		}
	},
	methods: {
		handleImageError(event) {
			event.target.src = this.placeholderImage;
		},
		async seleccionarPokemon(id) {
			window.sessionStorage.setItem("activePokemon", id);
		},
	},
};
</script>
<template>
	<div class="back">
		<div class="title">
			<h1>Pokemons</h1>
		</div>
		<div class="card-group">
			<div v-for="(item, index) in pokemons">
				<div class="card pokemon-card">
					<router-link :to="'/Battle'" @click="seleccionarPokemon(item.id)">
						<div class="card-body">
							<h6 class="card-title">#{{ item.id }}</h6>
							<h5 class="card-title">{{ item.name }}</h5>
							<img
								:src="item.sprites.front_default"
								class="card-img-top"
								alt="Pokemon Image"
								loading="lazy"
								@error="handleImageError"
							/>
						</div>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.pokemon-card {
	text-align: center;
	width: 10rem;
	margin-top: 10px;
	margin-left: 4px;
	margin-right: 4px;
	border-radius: 2rem;
}

.pokemon-card:hover {
	transform: scale(1.05);
	text-shadow: rgb(0, 0, 0) 1px 0 8px;
	box-shadow: rgb(0, 0, 0) 1px 0 8px;
}

.title {
	color: black;
	margin-left: 10px;
	font-family: "MonomaniacOneRegular", sans-serif;
}
.card-group {
	display: flex;
	justify-content: center;
	align-items: center;
}

.card-title {
	color: black;
}
</style>
