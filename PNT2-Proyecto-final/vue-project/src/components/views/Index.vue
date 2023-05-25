<script>
import { onMounted } from "vue";
export default {
	data() {
		return {
			userObject: null,
		};
	},
	mounted() {
		const storedUserObject = window.sessionStorage.getItem("userObject");
		if (storedUserObject) {
			this.userObject = JSON.parse(storedUserObject);
		}
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
