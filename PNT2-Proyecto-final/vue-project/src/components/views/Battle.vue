<template>
	<div class="fondo">
		<div class="row" v-if="jugando">
			<div class="container">
				<div class="column">
					<h1>Batalla</h1>
					<div class="moves-history">
						<div v-for="(item, index) in mensaje">
							<p>{{ item }}</p>
						</div>
					</div>
				</div>

				<!-- USUARIO -->
				<div class="card col m5 brown lighten-1 quitar-padding-lateral">
					<h1 style="text-align: center">
						{{
							pokemonUsuario.name?.charAt(0).toUpperCase() +
							pokemonUsuario.name?.slice(1)
						}}
					</h1>
					<div class="card-image">
						<img
							:src="pokemonUsuario.sprites?.other.home.front_default"
							alt="Pokemon Image"
							class="image girar-imagen"
						/>
					</div>

					<div class="card-content grey lighten-2">
						<i class="fa fa-heartbeat"></i>
						<span class="right">{{ saludUsuario }}/{{ hpUsuario }}</span>
						<div class="progress brown">
							<div
								class="determinate red"
								:style="{ width: (saludUsuario / hpUsuario) * 100 + '%' }"
							></div>
						</div>

						<i class="fa fa-magic"></i>
						<span class="right">{{ manaUsuario }}/100</span>
						<div class="progress brown">
							<div
								class="determinate blue"
								:style="{ width: manaUsuario + '%' }"
							></div>
						</div>
					</div>

					<div class="card-action barra-ataques brown darken-3">
						<div
							v-for="(item, index) in ataquesUsuario"
							:key="index"
							:class="['style-circle', item.type?.name]"
						>
							<a class="btn circle" @click="turno(item)"
								><i class="bi bi-bandaid-fill">{{ item.name }}</i></a
							>
						</div>
						<a
							:class="[
								manaUsuario < 15 ? 'disabled' : 'green',
								'btn-floating',
								'style-circle',
								'verde',
							]"
							@click="curar"
							><i class="btn circle">Curar</i></a
						>
						<a class="style-circle red" @click="rendirse"
							><i class="btn circle">Rendirse</i></a
						>
					</div>
				</div>
				<!-- ENEMIGO -->
				<div
					class="card col offset-m2 m5 brown lighten-1 quitar-padding-lateral"
				>
					<h1 style="text-align: center">
						{{
							pokemonEnemigo.name?.charAt(0).toUpperCase() +
							pokemonEnemigo.name?.slice(1)
						}}
					</h1>
					<div class="card-image">
						<img
							:src="pokemonEnemigo.sprites?.other.home.front_default"
							alt="Pokemon Image"
							class="image"
						/>
					</div>

					<div class="card-content grey lighten-2">
						<i class="fa fa-heartbeat"></i>
						<span class="right">{{ saludEnemigo }}/{{ hpEnemigo }}</span>
						<div class="progress brown">
							<div
								class="determinate red"
								:style="{ width: (saludEnemigo / hpEnemigo) * 100 + '%' }"
							></div>
						</div>

						<i class="fa fa-magic"></i>
						<span class="right">{{ manaEnemigo }}/100</span>
						<div class="progress brown">
							<div
								class="determinate blue"
								:style="{ width: manaEnemigo + '%' }"
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div v-else class="center-align">
			<a href="#" class="yellow-text mensaje-final" @click="reinciar">
				¡{{ mensaje }}!
				<h6 class="yellow-text">Click para volver a intentar</h6>
			</a>
		</div>
	</div>
</template>

<!-------------------------------------------------------->

<script>
import "../styles/type.css";

export default {
	data() {
		return {
			hpUsuario: 0,
			hpEnemigo: 0,
			saludUsuario: 0,
			manaUsuario: 100,
			saludEnemigo: 0,
			manaEnemigo: 100,
			jugando: true,
			mensaje: [],

			pokemonUsuario: {},
			pokemonEnemigo: {},

			ataquesUsuario: [],
			ataquesEnemigo: [],

			primero: true,
		};
	},

	created: async function () {
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/1`);
		this.pokemonUsuario = await response.json();

		const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/4`);
		this.pokemonEnemigo = await response2.json();

		this.saludUsuario = this.hpUsuario = this.pokemonUsuario.stats.find(
			(stat) => stat.stat.name === "hp"
		).base_stat;
		this.saludEnemigo = this.hpEnemigo = this.pokemonEnemigo.stats.find(
			(stat) => stat.stat.name === "hp"
		).base_stat;

		this.ataquesUsuario = this.pokemonUsuario.moves
			.filter((move) => move.damage_class !== "status")
			.slice(0, 3);

		const movesWithDetailsUser = await Promise.all(
			this.pokemonUsuario.moves.map((move) =>
				fetch(move.move.url).then((response) => response.json())
			)
		);
		movesWithDetailsUser.sort(() => Math.random() - 0.5);
		this.ataquesUsuario = movesWithDetailsUser
			.filter((move) => move.damage_class.name !== "status")
			.slice(0, 3);

		const movesWithDetailsEnemy = await Promise.all(
			this.pokemonEnemigo.moves.map((move) =>
				fetch(move.move.url).then((response) => response.json())
			)
		);
		movesWithDetailsEnemy.sort(() => Math.random() - 0.5);
		this.ataquesEnemigo = movesWithDetailsEnemy
			.filter((move) => move.damage_class.name !== "status")
			.slice(0, 3);

		const speedUser = this.pokemonUsuario.stats.find(
			(stat) => stat.stat.name === "speed"
		).base_stat;
		const speedEnemy = this.pokemonEnemigo.stats.find(
			(stat) => stat.stat.name === "speed"
		).base_stat;

		if (speedEnemy > speedUser) {
			this.primero = false;
		}
	},
	methods: {
		turno(move) {
			if (this.primero) {
				this.normal(move);
				this.enemigo();
			} else {
				this.enemigo();
				this.normal(move);
			}
		},
		batalla() {
			if (this.saludUsuario <= 0) {
				this.jugando = false;
				this.mensaje = "Derrota";
			}
			if (this.saludEnemigo <= 0) {
				this.jugando = false;
				this.mensaje = "Victoria";
			}
		},
		enemigo() {
			var decision;

			if (this.manaEnemigo < 15 || this.saludEnemigo >= this.hpEnemigo - 5) {
				decision = Math.floor(Math.random() * 3);
			} else {
				decision = Math.floor(Math.random() * 4);
			}

			if (decision <= 2) {
				const randomNumber = Math.floor(Math.random() * 100) + 1;
				if (randomNumber <= this.ataquesEnemigo[decision].accuracy) {
					var atk;
					var def;
					if (this.ataquesEnemigo[decision].damage_class.name === "physical") {
						atk = this.pokemonEnemigo.stats.find(
							(stat) => stat.stat.name === "attack"
						).base_stat;
						def = this.pokemonUsuario.stats.find(
							(stat) => stat.stat.name === "defense"
						).base_stat;
					} else {
						atk = this.pokemonEnemigo.stats.find(
							(stat) => stat.stat.name === "special-attack"
						).base_stat;
						def = this.pokemonUsuario.stats.find(
							(stat) => stat.stat.name === "special-defense"
						).base_stat;
					}

					var daño =
						Math.floor(
							(5 * this.ataquesEnemigo[decision].power * (atk / def)) / 50
						) + 1;
					this.saludUsuario -= daño;
					this.mostrarMensaje(
						"El enemigo utilizo " +
							this.ataquesEnemigo[decision].name +
							", y causo " +
							daño +
							" de daño",
						"green-text"
					);
				} else {
					this.mostrarMensaje(
						"El enemigo utilizo " +
							this.ataquesEnemigo[decision].name +
							", y fallo",
						"green-text"
					);
				}
			} else {
				this.manaEnemigo -= 15;
				var curacion = Math.floor(Math.random() * 5) + 1 + 5;

				if (curacion + this.saludEnemigo > this.hpEnemigo) {
					this.saludEnemigo = this.hpEnemigo;
				} else {
					this.saludEnemigo += curacion;
				}

				this.mostrarMensaje("El enemigo se cura " + curacion, "amber-text");
			}

			this.batalla();
		},
		normal(move) {
			const randomNumber = Math.floor(Math.random() * 100) + 1;
			if (randomNumber <= move.accuracy) {
				var atk;
				var def;
				if (move.damage_class.name === "physical") {
					atk = this.pokemonUsuario.stats.find(
						(stat) => stat.stat.name === "attack"
					).base_stat;
					def = this.pokemonEnemigo.stats.find(
						(stat) => stat.stat.name === "defense"
					).base_stat;
				} else {
					atk = this.pokemonUsuario.stats.find(
						(stat) => stat.stat.name === "special-attack"
					).base_stat;
					def = this.pokemonEnemigo.stats.find(
						(stat) => stat.stat.name === "special-defense"
					).base_stat;
				}

				var daño = Math.floor((5 * move.power * (atk / def)) / 50) + 1;
				this.saludEnemigo -= daño;
				this.mostrarMensaje(
					"Utilizaste " + move.name + ", y causaste " + daño + " de daño",
					"green-text"
				);
			} else {
				this.mostrarMensaje(
					"Utilizaste " + move.name + ", y fallaste",
					"green-text"
				);
			}

			this.batalla();
		},
		curar() {
			this.manaUsuario -= 15;
			var curacion = Math.floor(Math.random() * 5) + 1 + 5;

			this.mostrarMensaje("Te curas " + curacion, "lime-text");

			if (curacion + this.saludUsuario > 100) {
				this.saludUsuario = 100;
			} else {
				this.saludUsuario += curacion;
			}

			this.enemigo();
		},

		rendirse() {
			this.jugando = false;
			this.mensaje = "Retirada";
		},
		reinciar() {
			location.reload();
		},
		mostrarMensaje(msg, color) {
			if (this.jugando) {
				this.mensaje.push(msg);
			}
		},
	},
};
</script>

<style scoped>
.card-content {
	padding-bottom: 15px;
}
.card-action {
	padding-bottom: 15px;
}
.image {
	padding-bottom: 5px;
	margin-top: -12vh;
}
.fondo {
	background: url("https://images3.alphacoders.com/966/966315.png") center
		center fixed;
	min-height: 100vh;
	min-width: 100;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
}

.barra-ataques {
	display: flex;
	flex-direction: row;
	justify-content: center;
}

.quitar-padding-lateral {
	padding-left: 0 !important;
	padding-right: 0 !important;
}

.mensaje-final {
	font-size: 10em;
}

.girar-imagen {
	transform: scaleX(-1);
	filter: FlipH;
}
.container {
	display: flex;
	margin: 0%;
	padding-left: 0%;
	background-color: black;
}

.moves-history {
	overflow: auto;
	overflow-y: scroll;
	max-height: 77vh;
}

.column {
	flex-direction: column;
	width: 30vh;
}

.style-circle {
	border-radius: 15px;
}

.verde {
	background-color: green;
}

.red {
	background-color: red;
}

.blue {
	background-color: blue;
}
</style>
