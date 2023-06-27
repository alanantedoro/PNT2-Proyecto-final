<script>
import { inject, onMounted } from "vue";

export default {
	setup() {
		const userObject = inject("userObject");

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
};
</script>

<template>
	<div class="back">
		<h2 class="page-title">Últimas noticias sobre el mundo Pokémon!</h2>
		<div class="d-flex p-2">
			<div v-if="userObject">
				<p>Username: {{ userObject.username }}</p>
			</div>
			<section class="FlexContainer">
				<div class="card" style="width: 30rem">
					<img
						src="https://www.pokemon.com/static-assets/content-assets/cms2-es-es/img/trading-card-game/_tiles/sv/sv02/launch/sv02-launch-169-es.png"
						class="card-img-top"
						alt="..."
					/>
					<div class="card-body">
						<p class="card-text">
							Ya está disponible Escarlata y Púrpura-Evoluciones en Paldea de
							JCC Pokémon
						</p>
					</div>
				</div>
				<div class="card" style="width: 20rem">
					<img
						src="https://www.pokemon.com/static-assets/content-assets/cms2-es-es/img/trading-card-game/_tiles/tcgl/launch/tcgl-34-es.png"
						class="card-img-top"
						alt="..."
					/>
					<div class="card-body">
						<p class="card-text">Lanzamiento oficial de JCC Pokémon Live</p>
					</div>
				</div>
				<div class="card" style="width: 30rem">
					<img
						src="https://www.pokemon.com/static-assets/content-assets/cms2-es-es/img/attend-events/championship/2023-naic/2023-naic-pokemon-center-169.png"
						class="card-img-top"
						alt="..."
					/>
					<div class="card-body">
						<p class="card-text">
							Novedades sobre la tienda temporal de Pokémon Center en el
							Campeonato Internacional de Norteamérica
						</p>
					</div>
				</div>
				<div class="card" style="width: 30rem">
					<img
						src="https://www.pokemon.com/static-assets/content-assets/cms2-es-es/img/video-games/_tiles/pokemon-home/scarlet-violet/pokemon-home-169-es.png"
						class="card-img-top"
						alt="..."
					/>
					<div class="card-body">
						<p class="card-text">
							Conecta Pokémon Escarlata y Pokémon Púrpura con Pokémon HOME
						</p>
					</div>
				</div>
				<div class="card" style="width: 30rem">
					<img
						src="https://www.pokemon.com/static-assets/content-assets/cms2-es-es/img/watch-pokemon-tv/_tiles/stunts/team-rocket/team-rocket-169-es.png"
						class="card-img-top"
						alt="..."
					/>
					<div class="card-body">
						<p class="card-text">
							El Team Rocket marca tendencia y causa problemas en TV Pokémon
						</p>
					</div>
				</div>
				<div class="card" style="width: 30rem">
					<img
						src="https://www.pokemon.com/static-assets/content-assets/cms2-es-es/img/trading-card-game/series/incrementals/sv02-elite-trainer-box/sv02-elite-trainer-box-169-es.png"
						class="card-img-top"
						alt="..."
					/>
					<div class="card-body">
						<p class="card-text">Alcanza la élite evolucionada</p>
					</div>
				</div>
				<div class="card" style="width: 30rem">
					<img
						src="https://www.pokemon.com/static-assets/content-assets/cms2-es-es/img/video-games/_tiles/pokemon-masters/2023/06202023/pokemon-masters-ex-169.png"
						class="card-img-top"
						alt="..."
					/>
					<div class="card-body">
						<p class="card-text">
							Plata forma equipo con su gran compañero Sneasel
						</p>
					</div>
				</div>
			</section>
		</div>
	</div>
</template>
<style scoped>
.back {
	font-family: Arial, sans-serif;
	margin: 0;
	padding: 30px;
	padding-top: 5rem;
}

h2 {
	color: #333;
	text-align: center;
}

.d-flex {
	display: flexbox;
	justify-items: center;
}

.card {
	background-color: #98a8f0;
	margin: 10px;
	width: 18rem;
	border-radius: 5px;
}

.card-img-top {
	width: auto;
	height: auto;
	object-fit: cover;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
}

.card-text {
	color: rgb(35, 21, 191);
	font-size: 18px;
	padding: 20px;
}
.FlexContainer {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;
	width: 80%;
	margin: 0 auto;
	background-color: #2f1d58;
	height: 80vh;
	overflow: auto;
}

.card-body {
	padding: 2px;
}
.page-title {
	font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
	text-align: center;
	font-size: 36px;
	margin-bottom: 20px;
	color: #2f1d58;
	text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}
</style>
