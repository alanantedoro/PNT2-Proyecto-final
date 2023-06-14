import { defineStore } from "pinia";
import axios from "axios";

export const usuariosStore = defineStore("usuarios", {
	state: () => ({
		username: "",
		password: "",
	}),
	actions: {
		async login() {
			let headers = new Headers();
			headers.append("Content-Type", "application/json");
			headers.append("Accept", "application/json");

			headers.append("Access-Control-Allow-Origin", "http://localhost:5173");
			headers.append("Access-Control-Allow-Credentials", "true");

			headers.append("GET", "POST", "OPTIONS");
			return axios
				.post("http://localhost:8080/users/login", {
					// Aquí puedes incluir los datos que deseas enviar en el cuerpo de la solicitud
					credentials: "include",
					method: "POST",
					headers: headers,
					username: this.username,
					password: this.password,
				})
				.then((response) => {
					return response.data;
				})
				.catch((error) => {
					console.error(error); // Aquí puedes manejar cualquier error ocurrido durante la solicitud
				});
		},

		logout() {
			sessionStorage.setItem("userObject", null);
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
		signup(){
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
					console.error(error); // Aquí puedes manejar cualquier error ocurrido durante la solicitud
				});
		}
	},
});
