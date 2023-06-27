<template>
	<section class="h-100 gradient-form back">
		<div class="container-fluid h-100">
			<div class="row h-100 justify-content-center align-items-center">
				<div class="col-lg-6">
					<div class="card rounded-3 text-black form-log-in">
						<div class="card-body p-md-5 mx-md-4">
							<div class="text-center">
								<img src="../images/pokemon-signup.png" alt="logo" />
								<h4 class="mt-1 mb-5 pb-1">Please login to your account</h4>
							</div>
							<h6>{{ this.mensaje }}</h6>
							<form>
								<div class="form-outline mb-4">
									<input
										type="email"
										id="form2Example11"
										class="form-control"
										v-model="username"
										placeholder="Phone number or email address"
									/>
									<label class="form-label" for="form2Example11"
										>Username</label
									>
								</div>

								<div class="form-outline mb-4">
									<input
										type="password"
										id="form2Example22"
										class="form-control"
										v-model="password"
									/>
									<label class="form-label" for="form2Example22"
										>Password</label
									>
								</div>

								<div class="text-center pt-1 mb-5 pb-1">
									<button
										class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
										type="button"
										@click="loginVue()"
									>
										Log in
									</button>
									<br />
									<a class="text-muted" href="#!">Forgot password?</a>
								</div>

								<div
									class="d-flex align-items-center justify-content-center pb-4"
								>
									<p class="mb-0 me-2">Don't have an account?</p>
									<router-link :to="'/Signup'" class="btn btn-outline-danger"
										>Create new</router-link
									>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { usuariosStore } from "../../stores/Users.js";
import { useRouter } from "vue-router";

export default {
	data() {
		return {
			username: "",
			password: "",
			mensaje: "",
		};
	},
	setup() {
		const router = useRouter();

		const redirectToAnotherView = (pokedex) => {
			if (pokedex === "") {
				router.push("/SelectFirstPokemon");
			} else {
				router.push("/");
			}
		};

		return {
			redirectToAnotherView,
		};
	},
	methods: {
		async loginVue() {
			const userStore = usuariosStore();
			userStore.username = this.username;
			userStore.password = this.password;

			try {
				const data = await userStore.login(); // Llamada al método "login" de usuariosStore
				this.processData(data);
			} catch (error) {}
		},
		async processData(data) {
			if (data.existingUser) {
				// Guardar el objeto en la Session Storage
				sessionStorage.setItem("userObject", JSON.stringify(data.existingUser));
				this.redirectToAnotherView(data.existingUser.pokedex);
			} else {
				this.mensaje = data;
			}
		},
	},
};
</script>
<style>
.form-log-in {
	margin-top: 15px;
	margin-bottom: 15px;
}

.back {
	background-color: #99c0e1;
	min-height: 88vh;
	padding-top: 4.5rem;
}
</style>
