# PNT2-Proyecto-final

La idea del proyecto es un juego de combate de Pokémon, el usuario va a ir peleando contra distintos Pokémon y si les gana, quedarán en su Pokédex para poder utilizarlos en una posterior batalla. Se podrá acceder a la información y características de todos los Pokémon dentro del universo (para el MVP solo los de la 1era generación).

Se obtendrá la info de los Pokémon de la siguiente RESTful API: https://pokeapi.co/
Se utilizará como DB la siguiente plataforma: https://mockapi.io/, al menos en una primer versión. Ahí se guardará la info de los usuarios, Pokémon y combates.

Las clases y sus atributos dentro del modelo serán:
- Usuario:
  - ID.
  - username.
  - password.
  - Array de Pokémon.
  - Array de Combates.
- Combate:
  - ID.
  - userId.
  - userPokemonId.
  - computerPokemonId.
  - ganó.

El combate se dará de la siguiente manera:
- El primero que ataca es el que más speed tiene.
- Del Pokémon se obtendrán los primeros tres ataques con power > 0.
- A partir del cálculo para el daño se calcula el poder de cada ataque, esto se quita de la vida del contrincante.
- Los turnos de ataque se van intercalando uno a uno.
- El usuario puede elegir entre los ataques el que más le convenga.

A nivel diseño, para las pantallas se usarán los colores característicos de este universo: Blanco, Azul y Rojo. Con un estilo minimalista y retro.

Las vistas que tendra el proyecto serán:
- Home
- Log In / Sign Up
- Perfil
- Pokédex
- Combate
- Historial
