<script>
import { inject, onMounted } from "vue";
import { usuariosStore } from "../../stores/Users.js";
import { storeToRefs } from "pinia";


export default {
	data() {
		return {
			isReadOnly : true,
		}
	},
	setup() {
		const userObject = inject("userObject");
		console.log(userObject)
		onMounted(() => {
			const storedUserObject = window.sessionStorage.getItem("userObject");
			if (storedUserObject) {
				userObject.value = JSON.parse(storedUserObject);
			}
		});

		return {
			userObject,
		};
	},
	methods: {
		edit(){
				this.$data.namePlaceholder = "Inserte su nuevo nombre de usuario";
				this.$data.passwordPlaceholder = "Inserte su nueva password";
				this.$data.isReadOnly = false
			},
		async update() {
			const userStore = usuariosStore();
			const { userID } = storeToRefs(userStore)
			const updatedFields = {
				username : document.getElementById("newusername").value,
				password : document.getElementById("newpassword").value,
			  };


			try {
				console.log(updatedFields)
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
	}
};
</script>

<template>
	<div class="back">
		<div v-if="userObject">
			<h2>Perfil</h2> <br>
			<h3>Presiona "Editar" para habilitar la edicion.</h3>
			<label class="inputText">Nombre:</label>
			<input class="inputText" type="text" :placeholder="userObject.username" :readonly="isReadOnly" id="newusername"> <br>
			<label class="inputText">Password:</label>
			<!-- Por algun motivo no puedo traer la password, tema de hasheo?? -->
			<input class="inputText" type="text" :placeholder="userObject.password" :readonly="isReadOnly" id="newpassword"> <br>
			<button class="button-edit" v-on:click="edit" :hidden="!isReadOnly">Editar</button>
			<button  class="button-edit" v-on:click="update" :hidden="isReadOnly">Confirmar </button>
		</div>
	</div>
</template>
<style scoped>

.inputText{
	margin-left: 2%;
	margin-top: 1%;
}

.button-edit {
  background: #FF4742;
  border: 1px solid #FF4742;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: nunito,roboto,proxima-nova,"proxima nova",sans-serif;
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
  color: #FF4742;
}

.button-edit:active {
  opacity: .5;
}
</style>
