<template>
	<!--<audio ref="battleSong" src="/sounds/battle.mp3"></audio>-->
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
				<div
					:class="[
						'card',
						'col',
						'm5',
						'brown',
						'lighten-1',
						'quitar-padding-lateral',
						{ damaged: userRecibeDmg },
					]"
				>
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
							:class="[
								'style-circle',
								item.type?.name,
								{ 'disabled-pointer': !visible },
							]"
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
								{ 'disabled-pointer': !visible },
							]"
							@click="curar"
							><i class="btn circle">Curar</i></a
						>
						<a
							:class="['style-circle', 'red', { 'disabled-pointer': !visible }]"
							@click="rendirse"
							><i class="btn circle">Rendirse</i></a
						>
					</div>
				</div>
				<!-- ENEMIGO -->
				<div
					:class="[
						'card',
						'col',
						'm5',
						'brown',
						'offset-m2',
						'lighten-1',
						'quitar-padding-lateral',
						{ damaged: enemyRecibeDmg },
					]"
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
			<div v-if="inicio" class="inicio">
				<RouterLink to="/SelectActivePokemon" class="link-navbar"
					><h1 style="color: aliceblue !important">
						Elegir un Pokemon
					</h1></RouterLink
				>

				<a @click="empezar"><h1 class="text-link">START</h1></a>
			</div>
			<div v-else>
				<a href="#" class="yellow-text mensaje-final" @click="reinciar">
					¡{{ mensaje }}!
					<h6 class="yellow-text">Click para volver a intentar</h6>
				</a>
			</div>
		</div>
	</div>
</template>

<!------------------------SCRIPT-------------------------------->

<script>
import "../styles/type.css";
import {
	calculateDmg,
	obtDecision,
	calculateFastest,
	obtMoves,
	obtEnemyPokemon,
	relatedDamageMsg,
	checkPokedex,
} from "../functions/BattleFunctions.js";
import { battleStore } from "../../stores/Battle.js";
import { usuariosStore } from "../../stores/Users.js";
import { inject } from "vue";
import { useRouter } from "vue-router";

export default {
	data() {
		return {
			hpUsuario: 0,
			hpEnemigo: 0,
			saludUsuario: 0,
			manaUsuario: 100,
			saludEnemigo: 0,
			manaEnemigo: 100,
			jugando: false,
			mensaje: [],
			pokemonUsuario: {},
			pokemonEnemigo: {},
			ataquesUsuario: [],
			ataquesEnemigo: [],
			primero: true,
			visible: true,
			userRecibeDmg: false,
			enemyRecibeDmg: false,
			inicio: true,
			winner: null,
		};
	},

	created: async function () {
		const activePokemon = window.sessionStorage.getItem("activePokemon");
		const router = useRouter();
		console.log("Active Pokemon : ", activePokemon);

		if (activePokemon <= 0) {
			router.push("/SelectActivePokemon");
			return;
		}
		const userStore = usuariosStore();
		const storedUserObject = window.sessionStorage.getItem("userObject");
		let userID = 0;
		if (storedUserObject) {
			const userObject = JSON.parse(storedUserObject);
			userID = userObject.id;
		}
		const inPokedex = await userStore.inPokedex(userID, activePokemon);
		if (inPokedex == null || !inPokedex.ok) {
			router.push("/SelectActivePokemon");
			return;
		}
		const response = await fetch(
			`https://pokeapi.co/api/v2/pokemon/${activePokemon}`
		);
		this.pokemonUsuario = await response.json();
		this.pokemonEnemigo = await obtEnemyPokemon();

		this.saludUsuario = this.hpUsuario = this.pokemonUsuario.stats.find(
			(stat) => stat.stat.name === "hp"
		).base_stat;
		this.saludEnemigo = this.hpEnemigo = this.pokemonEnemigo.stats.find(
			(stat) => stat.stat.name === "hp"
		).base_stat;

		this.ataquesUsuario = await obtMoves(this.pokemonUsuario);
		this.ataquesEnemigo = await obtMoves(this.pokemonEnemigo);

		this.primero = calculateFastest(this.pokemonUsuario, this.pokemonEnemigo);
	},
	methods: {
		async actualizarPokedex() {
			let userObject = {};
			const userStore = usuariosStore();
			const storedUserObject = window.sessionStorage.getItem("userObject");
			if (storedUserObject) {
				userObject = JSON.parse(storedUserObject);
				const userID = userObject.id;
				const pokedex =
					userObject.pokedex + "," + this.pokemonEnemigo.id.toString();
				const updatedFields = {
					updatedFields: {
						pokedex: pokedex,
					},
				};
				try {
					const data = await userStore.update(userID, updatedFields);
					if (data) {
						userObject.pokedex = pokedex;
						window.sessionStorage.setItem(
							"userObject",
							JSON.stringify(userObject)
						);
					}
				} catch (error) {
					console.error(error);
				}
			}
		},
		empezar() {
			this.jugando = true;
			this.inicio = false;
			//this.$refs.battleSong.play();
		},
		turno(move) {
			this.visible = false;
			if (this.primero) {
				this.normal(move);
				if (this.jugando) {
					setTimeout(() => {
						this.enemigo();
						this.visible = true;
					}, 1000);
				}
			} else {
				this.enemigo();
				if (this.jugando) {
					setTimeout(() => {
						this.normal(move);
						this.visible = true;
					}, 1000);
				}
			}
		},
		batalla() {
			if (this.jugando) {
				if (this.saludUsuario <= 0) {
					this.jugando = false;
					this.mensaje = "Derrota";
					this.winner = false;
					this.registerBattle();
					//this.$refs.battleSong.pause();
				} else if (this.saludEnemigo <= 0) {
					this.jugando = false;
					this.mensaje = "Victoria";
					this.winner = true;
					this.registerBattle();
					if (!checkPokedex(this.pokemonEnemigo.id)) {
						this.actualizarPokedex();
					}
					//this.$refs.battleSong.pause();
				}
			}
		},
		async enemigo() {
			const decision = obtDecision(
				this.manaEnemigo,
				this.saludEnemigo,
				this.hpEnemigo
			);
			if (decision <= 2) {
				let randomNumber = Math.floor(Math.random() * 100) + 1;
				const move = this.ataquesEnemigo[decision];
				if (randomNumber <= move.accuracy) {
					const { dmg, indice } = await calculateDmg(
						move,
						this.pokemonEnemigo,
						this.pokemonUsuario
					);
					this.saludUsuario -= dmg;
					this.mostrarMensaje(
						"El enemigo utilizo " + move.name + ", y causo " + dmg + " de daño",
						"green-text"
					);
					const msg = relatedDamageMsg(indice);
					if (msg !== "") {
						this.mostrarMensaje(msg, "");
					}
					if (dmg > 0) {
						this.userRecibeDmg = true;
						setTimeout(() => {
							this.userRecibeDmg = false;
						}, 1000);
					}
				} else {
					this.mostrarMensaje(
						"El enemigo utilizo " + move.name + ", y fallo",
						"green-text"
					);
				}
			} else {
				this.manaEnemigo -= 15;
				let curacion = Math.floor(Math.random() * 5) + 1 + 5;
				if (curacion + this.saludEnemigo > this.hpEnemigo) {
					this.saludEnemigo = this.hpEnemigo;
				} else {
					this.saludEnemigo += curacion;
				}
				this.mostrarMensaje("El enemigo se cura " + curacion, "amber-text");
			}
			this.batalla();
		},
		async normal(move) {
			let randomNumber = Math.floor(Math.random() * 100) + 1;
			if (randomNumber <= move.accuracy) {
				const { dmg, indice } = await calculateDmg(
					move,
					this.pokemonUsuario,
					this.pokemonEnemigo
				);
				this.saludEnemigo -= dmg;
				this.mostrarMensaje(
					"Utilizaste " + move.name + ", y causaste " + dmg + " de daño",
					"green-text"
				);
				const msg = relatedDamageMsg(indice);
				if (msg !== "") {
					this.mostrarMensaje(msg, "");
				}
				if (dmg > 0) {
					this.enemyRecibeDmg = true;
					setTimeout(() => {
						this.enemyRecibeDmg = false;
					}, 1000);
				}
			} else {
				this.mostrarMensaje(
					"Utilizaste " + move.name + ", y fallaste",
					"green-text"
				);
			}
			this.batalla();
		},
		curar() {
			if (this.manaUsuario >= 15) {
				this.manaUsuario -= 15;
				let curacion = Math.floor(Math.random() * 5) + 1 + 5;
				this.mostrarMensaje("Te curas " + curacion, "lime-text");
				if (curacion + this.saludUsuario > 100) {
					this.saludUsuario = 100;
				} else {
					this.saludUsuario += curacion;
				}
				this.enemigo();
			}
		},
		rendirse() {
			this.jugando = false;
			this.mensaje = "Retirada";

			this.winner = false;
			this.registerBattle();
		},
		reinciar() {
			location.reload();
		},
		mostrarMensaje(msg, color) {
			if (this.jugando) {
				this.mensaje.push(msg);
				this.scrollToBottom();
			}
		},
		scrollToBottom() {
			this.$nextTick(() => {
				const container = document.querySelector(".moves-history");
				if (container != null) {
					container.scrollTop = container.scrollHeight;
				}
			});
		},
		registerBattle() {
			let userObject = {};
			const storedUserObject = window.sessionStorage.getItem("userObject");
			userObject = JSON.parse(storedUserObject);

			const battle = battleStore();

			battle.userID = userObject.id;
			battle.userPokemon = this.pokemonUsuario.id;
			battle.enemyPokemon = this.pokemonEnemigo.id;
			battle.winner = this.winner;

			console.log("Battle info: ", battle);
			try {
				const data = battle.register();

				if (data) {
					console.log("Partida terminada :", data);
				} else {
					throw new Error("La batalla no se registro");
				}
			} catch (error) {
				this.mensaje = error.message;
			}
		},
	},
};
</script>

<style scoped>
.text-link:hover {
	cursor: pointer !important;
}
.inicio {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: aliceblue !important;
}
.card-content {
	padding-bottom: 15px;
}
.card-action {
	padding-bottom: 15px;
}
.image {
	padding-bottom: 5px;
	margin-top: -5.5vh;
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
	padding-top: 4.5rem;
	padding-bottom: 2rem;
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
	border-radius: 10px;
	height: 90vh;
	width: 167vh;
}

.moves-history {
	overflow: auto;
	overflow-y: scroll;
	max-height: 82.5vh;
	padding-left: 4px;
	padding-right: 4px;
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

.disabled-pointer {
	pointer-events: none;
}

.damaged {
	/* Estilos para el impacto visual */
	animation: flash 1s;
}

@keyframes flash {
	0%,
	50%,
	100% {
		background-color: transparent;
	}
	25%,
	75% {
		background-color: rgba(255, 0, 0, 0.5);
	}
}
</style>
