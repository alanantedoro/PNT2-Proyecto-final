<script>
import { ref, inject, onMounted } from "vue";
import { usuariosStore } from "../../stores/Users.js";
import { battleStore } from "../../stores/Battle";
import { storeToRefs } from "pinia";

export default {
	data() {
		return {
			isReadOnly: true,
		};
	},
	setup() {
		const userObject = inject("userObject");
		let battles = ref([]);
		console.log(userObject);

		const getBattles = async () => {
			try {
				const battles = battleStore();
				const data = await battles.getByUserID(userObject.value.id);
				// console.log("data > ",data);
				getPokeSprites(data);
				return data;
			} catch (error) {
				console.error(error);
			}
		};

		let enemyPokemons = [];
		let myPokemons = [];

		async function getPokeSprites(data) {
			const battles = data.battles;
			console.log("battles >>", battles);
			console.log("ids >>", battles.enemyPokemon);
			for (const id of battles) {
				console.log("POKE ID>>>>", id.enemyPokemon);
				const enemyResponse = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${id.enemyPokemon}`
				);
				const myResponse = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${id.userPokemon}`
				);
				enemyPokemons.push(await enemyResponse.json());
				myPokemons.push(await myResponse.json());
			}

			return enemyPokemons;
		}

		onMounted(async () => {
			const storedUserObject = window.sessionStorage.getItem("userObject");
			if (storedUserObject) {
				userObject.value = JSON.parse(storedUserObject);
			}
			const battleReq = await getBattles();
			battles.value = battleReq.battles;
			console.log(battles);
		});

		return {
			userObject,
			battles,
			enemyPokemons,
			myPokemons,
		};
	},
	methods: {
		edit() {
			this.$data.namePlaceholder = "Inserte su nuevo nombre de usuario";
			this.$data.passwordPlaceholder = "Inserte su nueva password";
			this.$data.isReadOnly = false;
		},
		async update() {
			const userStore = usuariosStore();
			const { userID } = storeToRefs(userStore);
			const updatedFields = {
				username: document.getElementById("newusername").value,
				password: document.getElementById("newpassword").value,
			};

			try {
				console.log(updatedFields);
				const data = await userStore.update(updatedFields);
				this.processData(data);
			} catch (error) {
				console.error(error);
			}
		},
		async processData(data) {
			console.log(data);
			if (data.updated) {
				// Guardar el objeto en la Session Storage
				sessionStorage.setItem("userObject", JSON.stringify(data.existingUser));
			} else {
				this.mensaje = "Error en el update";
			}
		},
	},
};
</script>

<template>
	<div class="back">
		<div v-if="userObject">
			<h2>Perfil</h2>
			<br />
			<h3>Presiona "Editar" para habilitar la edicion.</h3>
			<label class="inputText">Nombre:</label>
			<input
				class="inputText"
				type="text"
				:placeholder="userObject.username"
				:readonly="isReadOnly"
				id="newusername"
			/>
			<br />
			<label class="inputText">Password:</label>
			<input
				class="inputText"
				type="text"
				:placeholder="userObject.password"
				:readonly="isReadOnly"
				id="newpassword"
			/>
			<br />
			<button class="button-edit" v-on:click="edit" :hidden="!isReadOnly">
				Editar
			</button>
			<button class="button-edit" v-on:click="update" :hidden="isReadOnly">
				Confirmar
			</button>

			<div class="table-wrapper">
				<h2 id="historyTitle">Historial de partidas:</h2>
				<table class="fl-table">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Pokemon</th>
							<th scope="col">Enemigo</th>
							<th scope="col">Resultado</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(battle, index) in battles" :key="battle.id">
							<th scope="row">{{ battle.id }}</th>
							<td><img :src="myPokemons[index]?.sprites?.front_default" /></td>
							<td>
								<img :src="enemyPokemons[index]?.sprites?.front_default" />
							</td>
							<td>{{ battle.winner == 1 ? "Ganada" : "Perdida" }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
<style scoped>
.inputText {
	margin-left: 2%;
	margin-top: 1%;
}
.back {
	padding-top: 4.5rem;
}

.button-edit {
	background: #ff4742;
	border: 1px solid #ff4742;
	border-radius: 6px;
	box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
	box-sizing: border-box;
	color: #ffffff;
	cursor: pointer;
	display: inline-block;
	font-family: nunito, roboto, proxima-nova, "proxima nova", sans-serif;
	font-size: 16px;
	font-weight: 800;
	line-height: 16px;
	min-height: 40px;
	outline: 0;
	padding: 12px 14px;
	text-align: center;
	text-rendering: geometricprecision;
	text-transform: none;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	vertical-align: middle;
	margin: 2% 0 0 5%;
}

.button-edit:hover,
.button-edit:active {
	background-color: initial;
	background-position: 0 0;
	color: #ff4742;
}

.button-edit:active {
	opacity: 0.5;
}

#historyTitle {
	margin: 2% 0 0 1%;
}

* {
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
}
body {
	font-family: Helvetica;
	-webkit-font-smoothing: antialiased;
	background: rgba(71, 147, 227, 1);
}
h2 {
	text-align: center;
	font-size: 18px;
	text-transform: uppercase;
	letter-spacing: 1px;
	color: white;
	padding: 30px 0;
}

.table-wrapper {
	margin: 2% 6% 2%;
}

.fl-table {
	border-radius: 5px;
	font-size: 12px;
	font-weight: normal;
	border: none;
	border-collapse: collapse;
	width: 100%;
	max-width: 100%;
	white-space: nowrap;
	background-color: white;
}

.fl-table td,
.fl-table th {
	text-align: center;
	padding: 8px;
}

.fl-table td {
	border-right: 1px solid #f8f8f8;
	font-size: 12px;
}

.fl-table thead th {
	color: #ffffff;
	background: #4fc3a1;
}

.fl-table thead th:nth-child(odd) {
	color: #ffffff;
	background: #324960;
}

.fl-table tr:nth-child(even) {
	background: #f8f8f8;
}

/* Responsive */

@media (max-width: 767px) {
	.fl-table {
		display: block;
		width: 100%;
	}
	.table-wrapper:before {
		display: block;
		text-align: right;
		font-size: 11px;
		color: white;
		padding: 0 0 10px;
	}
	.fl-table thead,
	.fl-table tbody,
	.fl-table thead th {
		display: block;
	}
	.fl-table thead th:last-child {
		border-bottom: none;
	}
	.fl-table thead {
		float: left;
	}
	.fl-table tbody {
		width: auto;
		position: relative;
		overflow-x: auto;
	}
	.fl-table td,
	.fl-table th {
		padding: 20px 0.625em 0.625em 0.625em;
		height: 60px;
		vertical-align: middle;
		box-sizing: border-box;
		overflow-x: hidden;
		overflow-y: auto;
		width: 120px;
		font-size: 13px;
		text-overflow: ellipsis;
	}
	.fl-table thead th {
		text-align: left;
		border-bottom: 1px solid #f7f7f9;
	}
	.fl-table tbody tr {
		display: table-cell;
	}
	.fl-table tbody tr:nth-child(odd) {
		background: none;
	}
	.fl-table tr:nth-child(even) {
		background: transparent;
	}
	.fl-table tr td:nth-child(odd) {
		background: #f8f8f8;
		border-right: 1px solid #e6e4e4;
	}
	.fl-table tr td:nth-child(even) {
		border-right: 1px solid #e6e4e4;
	}
	.fl-table tbody td {
		display: block;
		text-align: center;
	}
}
</style>
