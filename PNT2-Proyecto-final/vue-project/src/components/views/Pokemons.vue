<script>
    
export default {
    data () {
    return {
        pokemonsParse: [],
        pokemons: [],
        }
    },
    created: async function() {
        const pokemons = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');                 
        this.pokemons = await pokemons.json();
        this.pokemonsParse = this.pokemons.results
        }
    
};

</script>
<template>
    <h1>Pokemons</h1>
    <div class="card-group">
    <div v-for="(item, index) in pokemonsParse">
        <div class="card" style="width: 8rem;">
            <div class="card-body">
            <h5 class="card-title">{{ item.name}}</h5>
            <router-link :to="'/pokemon/' + item.url.split(`/`)[6]" class="btn btn-primary">Info</router-link>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped>
</style>