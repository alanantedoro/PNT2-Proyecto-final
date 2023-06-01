//ESTA FUNCION CALCULA LA EFECTIVIDAD DEL TIPO DEL MOVIMIENTO
//EN RELACION AL POKEMON QUE ESTA SIENDO ATACADO
//RECIBE EL TIPO DEL MOVIMIENTO Y LOS TIPOS DEL POKEMON QUE RECIBE EL ATAQUE
function calculateDebRes(moveType, types) {
	var indice = 1;
	const doubleDamageTo = moveType.damage_relations.double_damage_to;
	const halfDamageTo = moveType.damage_relations.half_damage_to;
	const noDamageTo = moveType.damage_relations.no_damage_to;

	types.forEach(function (type) {
		if (doubleDamageTo.some((tipo) => tipo.name === type.name)) {
			indice = indice * 2;
		}
		if (halfDamageTo.some((tipo) => tipo.name === type.name)) {
			(indice = indice * 0), 5;
		}
		if (noDamageTo.some((tipo) => tipo.name === type.name)) {
			indice = 0;
		}
	});

	console.log(indice);

	return indice;
}

function calculateDmg(move, offPoke, defPoke) {
	var dmg = 0;
	const atk = obtAtk(move, offPoke);
	const def = obtDef(move, defPoke);
	//const moveType = await fetch(move.type.url);
	dmg = Math.floor((5 * move.power * (atk / def)) / 50) + 1;
	return dmg;
}

function obtAtk(move, offPoke) {
	var atk = 1;
	if (move.damage_class.name === "physical") {
		atk = offPoke.stats.find((stat) => stat.stat.name === "attack").base_stat;
	} else {
		atk = offPoke.stats.find(
			(stat) => stat.stat.name === "special-attack"
		).base_stat;
	}
	return atk;
}

function obtDef(move, defPoke) {
	var def = 1;
	if (move.damage_class.name === "physical") {
		def = defPoke.stats.find((stat) => stat.stat.name === "defense").base_stat;
	} else {
		def = defPoke.stats.find(
			(stat) => stat.stat.name === "special-defense"
		).base_stat;
	}
	return def;
}

function obtDecision(mana, salud, hp) {
	var dec = 0;
	if (mana < 15 || salud >= hp - 5) {
		dec = Math.floor(Math.random() * 3);
	} else {
		dec = Math.floor(Math.random() * 4);
	}
	return dec;
}

function calculateFastest(pokeUser, pokeEnemy) {
	var first = true;
	const speedUser = pokeUser.stats.find(
		(stat) => stat.stat.name === "speed"
	).base_stat;
	const speedEnemy = pokeEnemy.stats.find(
		(stat) => stat.stat.name === "speed"
	).base_stat;
	if (speedEnemy > speedUser) {
		first = false;
	}
	return first;
}

async function obtMoves(poke) {
	const movesWithDetails = await Promise.all(
		poke.moves.map((move) =>
			fetch(move.move.url).then((response) => response.json())
		)
	);
	movesWithDetails.sort(() => Math.random() - 0.5);
	const moves = movesWithDetails
		.filter((move) => move.damage_class.name !== "status")
		.slice(0, 3);
	return moves;
}

async function obtEnemyPokemon() {
	const id = Math.floor(Math.random() * 386) + 1;
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
	const pokeEnemy = await response.json();
	return pokeEnemy;
}

export {
	calculateDebRes,
	calculateDmg,
	obtDecision,
	calculateFastest,
	obtMoves,
	obtEnemyPokemon,
};
