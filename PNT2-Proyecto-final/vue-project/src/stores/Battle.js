import { defineStore } from "pinia";
import axios from "axios";

export const battleStore = defineStore("battle", {
	state: () => ({
		userID: null,
		userPokemon : null,
		enemyPokemon: null,
        winner: null
	}),
	actions: {
		async register(){
            let headers = new Headers();
                    headers.append("Content-Type", "application/json");
                    headers.append("Accept", "application/json");
        
                    headers.append("Access-Control-Allow-Origin", "http://localhost:5173");
                    headers.append("Access-Control-Allow-Credentials", "true");
        
                    headers.append("GET", "POST", "OPTIONS");
                    return axios
                        .post("http://localhost:8080/battles/", {
                            credentials: "include",
                            method: "POST",
                            headers: headers,
                            userID : this.userID,
                            userPokemon : this.userPokemon,
                            enemyPokemon : this.enemyPokemon,
                            winner : this.winner,
        
                        })
                        .then((response) => {
                            return response.data;
                        })
                        .catch((error) => {
                            //console.error(error); // Aquí puedes manejar cualquier error ocurrido durante la solicitud
                        });
        }
	},
});
