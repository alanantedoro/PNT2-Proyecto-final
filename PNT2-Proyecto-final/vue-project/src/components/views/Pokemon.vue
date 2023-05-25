<script>
export default {
	data() {
		return {
			pokemon: {},
		};
	},
	created: async function () {
		const id = this.$route.params.id;
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		this.pokemon = await response.json();
	},
};
</script>
<template>
	<div>
		<h1>{{ pokemon.name }}</h1>
		<img :src="pokemon.sprites.front_default" alt="Pokemon Image" />
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
	</div>
</template>
<style scoped>
.stats {
	margin-top: 15px;
}

.types-container {
	display: flex;
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
	background-color: #78c850;
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
