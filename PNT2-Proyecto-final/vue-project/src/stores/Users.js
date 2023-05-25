import { defineStore } from "pinia";
import { onMounted } from "vue";

export const usuariosStore = defineStore("usuarios", {
	state: () => ({
		username: "",
		password: "",
	}),
	actions: {
		login() {
			const url = new URL("https://645ae5fd65bd868e93266759.mockapi.io/users");
			url.searchParams.append("password", this.password); //https://PROJECT_TOKEN.mockapi.io/tasks?completed=false
			url.searchParams.append("user", this.username);

			return fetch(url, {
				method: "GET",
				headers: { "content-type": "application/json" },
			}).then((response) => {
				return response
					.json()
					.then((data) => {
						console.log(data);

						if (data.length == 0) this.mensaje = "El usuario no se encontró";
						else this.mensaje = data[0].id;

						return data;
					})
					.catch((err) => {
						console.log(err);
					});
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
	},
});
