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
		const pokeIds = [1, 4, 7];
		for (const id of pokeIds) {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
			this.pokemons.push(await response.json());
		}
		this.pokemons.sort((a, b) => a.id - b.id);
	},
	methods: {
		handleImageError(event) {
			event.target.src = this.placeholderImage;
		},
		async agregarPokemon(id) {
			let userObject = {};
			const userStore = usuariosStore();
			const storedUserObject = window.sessionStorage.getItem("userObject");
			if (storedUserObject) {
				userObject = JSON.parse(storedUserObject);
			}
			const userID = userObject.id;
			const updatedFields = {
				updatedFields: {
					pokedex: id.toString(),
				},
			};
			try {
				const data = await userStore.update(userID, updatedFields);
				if (data) {
					userObject.pokedex = id.toString();
					window.sessionStorage.setItem(
						"userObject",
						JSON.stringify(userObject)
					);
				}
			} catch (error) {
				console.error(error);
			}
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
					<router-link :to="'/'" @click="agregarPokemon(item.id)">
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
