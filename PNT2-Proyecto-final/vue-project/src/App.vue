<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/Pokemons">Pokemons</RouterLink>
  <RouterView></RouterView>
</template>

<style scoped>
</style>
