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

		const redirectToAnotherView = () => {
			// Redirigir a otra vista
			router.push("/login");
		};

		return {
			redirectToAnotherView,
		};
	},
	methods: {
		async signup() {
			const userStore = usuariosStore();
			userStore.username = this.username;
			userStore.password = this.password;

			try {
				const data = await userStore.signup();
				if (data) {
					this.redirectToAnotherView();
				} else {
					//this.mensaje = "El usuario no se pudo crear" + data.message;
					throw new Error("El usuario no se pudo crear");
				}
			} catch (error) {
				//console.error(error);
				this.mensaje = error.message;
			}
		},
	},
};
</script>
<template>
	<div class="back">
		<section class="h-100 gradient-form" style="background-color: #99c0e1">
			<div class="container-fluid h-100">
				<div class="row h-100 justify-content-center align-items-center">
					<div class="col-lg-6">
						<div class="card rounded-3 text-black form-log-in">
							<div class="card-body p-md-5 mx-md-4">
								<div class="text-center">
									<img src="../images/pokemon-signup.png" alt="logo" />
									<h4 class="mt-1 mb-5 pb-1">Create an account</h4>
								</div>
								<form>
									<div class="form-outline mb-4">
										{{ this.mensaje }}
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
										<!-- ACA ESTE BOTON LLAMA A LA FUNCION LOGIN
                                    HAY QUE CREAR LA FUNCION SIGNUP -->
										<button
											class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
											type="button"
											@click="signup()"
										>
											Sign up
										</button>
									</div>

									<div
										class="d-flex align-items-center justify-content-center pb-4"
									>
										<p class="mb-0 me-2">Already have an account?</p>
										<router-link :to="'/Login'" class="btn btn-outline-danger"
											>Log in</router-link
										>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<style scoped>
.back {
	padding-top: 4.5rem;
}
</style>
