<script>
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
					<p>Height: {{ pokemon.height }}</p>
					<p>Weight: {{ pokemon.weight }}</p>
					<div v-for="(stat, index) in pokemon.stats" :key="index">
						<p>{{ stat.stat.name }}: {{ stat.base_stat }}</p>
					</div>
				</div>
				<br />
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

.flying {
	background-color: #98a8f0;
	color: black;
}

.normal {
	background-color: #a8a090;
}

.fighting {
	background-color: #a05038;
}

.poison {
	background-color: #b058a0;
}

.ground {
	background-color: #e9d6a4;
	color: black;
}

.rock {
	background-color: #b8a058;
}

.bug {
	background-color: #a8b820;
	color: black;
}

.ghost {
	background-color: #6060b0;
}

.steel {
	background-color: #a8a8c0;
	color: black;
}

.fire {
	background-color: #f05030;
}

.water {
	background-color: #3899f8;
	color: black;
}

.grass {
	background-color: #78c850;
	color: black;
}

.electric {
	background-color: #caf62c;
	color: black;
}

.psychic {
	background-color: #f870a0;
	color: black;
}

.ice {
	background-color: #58c8e0;
	color: black;
}

.dragon {
	background-color: #7860e0;
}

.dark {
	background-color: #7a5848;
}

.fairy {
	background-color: #e79fe7;
	color: black;
}

.unknown {
	background-color: black;
}

.shadow {
	background-color: #332e30;
}
</style>
