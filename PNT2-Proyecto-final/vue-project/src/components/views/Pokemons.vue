<script>
export default {
	data() {
		return {
			pokemons: [],
			placeholderImage: "/favicon.png",
		};
	},
	created: async function () {
		//LA IDEA ACA ES CREAR UN ARRAY DE OBJETOS CON INFO DE CADA POKEMON (nombre, id y la imagen)

		const response = await fetch(
			"https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
		);
		const { results } = await response.json();
		for (const { url } of results) {
			const response = await fetch(url);
			const data = await response.json();
			const pokemon = {
				id: data.id,
				name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
				image: data.sprites.front_default || this.placeholderImage,
			};
			this.pokemons.push(pokemon);
		}

		this.pokemons.sort((a, b) => a.id - b.id);
	},
	methods: {
		handleImageError(event) {
			event.target.src = this.placeholderImage;
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
					<div class="card-body">
						<h6 class="card-title">#{{ item.id }}</h6>
						<h5 class="card-title">{{ item.name }}</h5>
						<img
							:src="item.image"
							class="card-img-top"
							alt="Pokemon Image"
							loading="lazy"
							@error="handleImageError"
						/>
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

.btn-primary:hover {
	background-color: aqua;
}

.btn-primary {
	border-style: hidden;
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
</style>
