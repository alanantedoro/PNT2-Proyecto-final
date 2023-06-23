import { defineStore } from "pinia";
import axios from "axios";
import { useLoginStatusStore } from "./State.js";

export const usuariosStore = defineStore("usuarios", {
	state: () => ({
		userID: null,
		username: "",
		password: "",
	}),
	actions: {
		async login() {
			const stateStore = useLoginStatusStore();

			let headers = new Headers();
			headers.append("Content-Type", "application/json");
			headers.append("Accept", "application/json");

			headers.append("Access-Control-Allow-Origin", "http://localhost:5173");
			headers.append("Access-Control-Allow-Credentials", "true");

			headers.append("GET", "POST", "OPTIONS");
			return axios
				.post("http://localhost:8080/users/login", {
					credentials: "include",
					method: "POST",
					headers: headers,
					id: this.id,
					username: this.username,
					password: this.password,
				})
				.then((response) => {
					stateStore.logIn();
					return response.data;
				})
				.catch((error) => {
					return error.response.data.message;
				});
		},

		logout() {
			const stateStore = useLoginStatusStore();
			stateStore.logOut();
			sessionStorage.setItem("userObject", null);
			sessionStorage.setItem("activePokemon", null);
		},
		buscar() {
			const url = new URL("https://645ae5fd65bd868e93266759.mockapi.io/users");
			fetch(url, {
				method: "GET",
				headers: { "content-type": "application/json" },
			}).then((response) => {
				return response
					.json()
					.then((data) => {
						this.usuarios = data;
						return data;
					})
					.catch((err) => {
						console.log(err);
					});
			});
		},
		async signup() {
			let headers = new Headers();
			headers.append("Content-Type", "application/json");
			headers.append("Accept", "application/json");

			headers.append("Access-Control-Allow-Origin", "http://localhost:5173");
			headers.append("Access-Control-Allow-Credentials", "true");

			headers.append("GET", "POST", "OPTIONS");
			return axios
				.post("http://localhost:8080/users/", {
					// Aquí puedes incluir los datos que deseas enviar en el cuerpo de la solicitud
					credentials: "include",
					method: "POST",
					headers: headers,
					username: this.username,
					password: this.password,
					pokedex: "",
				})
				.then((response) => {
					return response.data;
				})
				.catch((error) => {
					//console.error(error); // Aquí puedes manejar cualquier error ocurrido durante la solicitud
				});
		},

		async update(id, updatedFields) {
			try {
				const response = await axios.put(
					`http://localhost:8080/users/${id}`,
					updatedFields
				);
				return true;
			} catch (error) {
				console.error("Error al actualizar el usuario:", error);
			}
		},
	},
});
