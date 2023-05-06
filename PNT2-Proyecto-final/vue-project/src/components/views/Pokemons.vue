<script>
    
export default {
    data () {
    return {
        pokemonsParse: [],
        pokemons: [],
        }
    },
    created: async function() {
        // const pokemons = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');                 
        // this.pokemons = await pokemons.json();

        //LA IDEA ACA ES CREAR UN ARRAY DE OBJETOS CON INFO DE CADA POKEMON (nombre, id y la imagen)

        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
        const { results } = await response.json();
        const pokemonDetails = await Promise.all(
        results.map(async ({ url }) => {
            const response = await fetch(url);
            const data = await response.json();
            return {
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,
            };
        })
        );
        this.pokemons = pokemonDetails;
        this.pokemonsParse = pokemonDetails;
        }
    
};

</script>
<template>
    <h1>Pokemons</h1>
    <div class="card-group">
    <div v-for="(item, index) in pokemonsParse">
        <div class="card" style="width: 9rem;" >
            <div class="card-body">
            <h6 class="card-title">#{{ item.id}}</h6>
            <h5 class="card-title">{{ item.name}}</h5>
            <img :src="item.image" class="card-img-top" alt="...">
            <router-link :to="'/pokemon/' + item.id" class="btn btn-primary">Info</router-link>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped>
.card-group{
    text-align: center;
}
</style>