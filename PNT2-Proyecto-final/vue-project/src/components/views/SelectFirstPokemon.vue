<script>
import "../styles/type.css";
export default {
	data() {
		return {
			pokemon: {},
			text: "",
		};
	},
	created: async function () {
		const id = this.$route.params.id;
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		this.pokemon = await response.json();
		const response2 = await fetch(
			`https://pokeapi.co/api/v2/pokemon-species/${id}`
		);
		const specie = await response2.json();
		// Filtrar los textos de especie en inglés
		const englishTexts = specie.flavor_text_entries.filter(
			(entry) => entry.language.name === "en"
		);

		// Obtener el primer texto en inglés
		if (englishTexts.length > 0) {
			// Generar un índice aleatorio dentro del rango de los textos disponibles
			const randomIndex = Math.floor(Math.random() * englishTexts.length);

			// Obtener el texto aleatorio en inglés
			this.text = englishTexts[randomIndex].flavor_text;
		} else {
			this.text = "No English description available.";
		}
	},
};
</script>
<template>
	<div class="back">
		<div class="container">
			<div class="pokemon-card">
				<br />
				<div class="title">
					<h1>
						#{{ pokemon.id }} <br />
						{{ pokemon.name?.charAt(0).toUpperCase() + pokemon.name?.slice(1) }}
					</h1>
				</div>
				<img
					:src="pokemon.sprites?.front_default"
					alt="Pokemon Image"
					class="image"
				/>
				<div class="types-container">
					<div
						v-for="(type, index) in pokemon.types"
						:key="index"
						:class="['type', type.type.name]"
					>
						<p>{{ type.type.name }}</p>
					</div>
				</div>
				<div class="stats">
					<div class="stat">Height: {{ pokemon.height / 10 }}m</div>
					<div class="stat">Weight: {{ pokemon.weight / 10 }}kg</div>
					<div v-for="(stat, index) in pokemon.stats" :key="index">
						<div class="stat">{{ stat.stat.name }}: {{ stat.base_stat }}</div>
					</div>
				</div>
			</div>
			<div>
				<div :class="['text-container', pokemon.types?.[0]?.type?.name]">
					<div class="text">
						{{ this.text }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.title {
	text-shadow: #000000 1px 0 2px;
}

.text-container {
	margin-left: 15px;
	max-width: 20rem;
	display: flex !important;
	justify-content: center !important; /* Centra horizontalmente en la pantalla */
	align-items: center; /* Centra verticalmente en la pantalla */
	border-radius: 15px;
	border: #332e30;
	border-style: double;
}

.text {
	text-align: center !important;
	padding: 15px;
}

.back {
	display: flex;
	justify-content: center; /* Centra horizontalmente en la pantalla */
	align-items: center; /* Centra verticalmente en la pantalla */
}

.container {
	display: flex;
	justify-content: center; /* Centra horizontalmente */
	align-items: center;
	color: white;
}

.pokemon-card {
	width: 15rem;
	background-color: whitesmoke;
	border-radius: 2rem;
	text-align: center;
}

.title {
	color: black;
}

.image {
	height: auto;
	width: auto;
}
.stats {
	margin-top: 15px;
	color: black;
	text-align: left !important;
	padding-left: 1rem;
	padding-bottom: 10px;
}

.stat {
	margin-bottom: 5px;
}
.types-container {
	display: flex;
	justify-content: center; /* Centra horizontalmente */
}

.type {
	margin-right: 10px;
	height: 1.8em;
	width: 4em;
	text-align: center;
	border-radius: 15px;
}
</style>
