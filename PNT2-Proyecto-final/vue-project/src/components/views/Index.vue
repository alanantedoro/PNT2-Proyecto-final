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
	<div>
		<h2>Welcome to Index Page</h2>
		<div v-if="userObject">
			<p>Username: {{ userObject.username }}</p>
		</div>
		<div v-else>
			<p>No user object found.</p>
		</div>
	</div>
</template>
<style scoped></style>
