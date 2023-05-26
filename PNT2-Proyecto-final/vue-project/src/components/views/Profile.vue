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
		<div v-if="userObject">
			<p>Username: {{ userObject.username }}</p>
			<p>Password: {{ userObject.password }}</p>
		</div>
		<div v-else>
			<p>No user object found.</p>
		</div>
	</div>
</template>
<style scoped></style>
