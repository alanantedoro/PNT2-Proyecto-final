<script>
export default {
	data() {
		return {
			pokemons: [],
		};
	},
	created: async function () {
		// const pokemons = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
		// this.pokemons = await pokemons.json();

		//LA IDEA ACA ES CREAR UN ARRAY DE OBJETOS CON INFO DE CADA POKEMON (nombre, id y la imagen)

		const response = await fetch(
			"https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
		);
		const { results } = await response.json();
		const pokemonDetails = await Promise.all(
			results.map(async ({ url }) => {
				const response = await fetch(url);
				const data = await response.json();
				return {
					id: data.id,
					name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
					image: data.sprites.front_default,
				};
			})
		);
		this.pokemons = pokemonDetails;
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
					<div class="card-body">
						<h6 class="card-title">#{{ item.id }}</h6>
						<h5 class="card-title">{{ item.name }}</h5>
						<img :src="item.image" class="card-img-top" alt="..." />
						<router-link :to="'/pokemon/' + item.id" class="btn btn-primary"
							>Info</router-link
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.pokemon-card {
	text-align: center;
	width: 10rem;
	margin-top: 6px;
	margin-left: 3px;
	margin-right: 3px;
}

.title {
	color: black;
	margin-left: 10px;
}
.card-group {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
