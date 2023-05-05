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
        return pokemonsParse;
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
<!-- hacer un *to para el hipervinculo pasandole el id del parametro url del json pokemons -->
            <a href="#" class="btn btn-primary">Info</a>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped>
</style>