<script>
export default {
  data() {
    return {
      pokemon: {},
    };
  },
  created: async function () {
    const id = this.$route.params.id;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    this.pokemon = await response.json();
  },
};
</script>
<template>
    <div>
      <h1>{{ pokemon.name }}</h1>
      <img :src="pokemon.sprites.front_default" alt="Pokemon Image" />
      <p>Height: {{ pokemon.height }}</p>
      <p>Weight: {{ pokemon.weight }}</p>
      <div v-for="(stat, index) in pokemon.stats" :key="index">
        <p>{{ stat.stat.name }}: {{ stat.base_stat }}</p>
      </div>
    </div>
  </template>
<style scoped>
</style>