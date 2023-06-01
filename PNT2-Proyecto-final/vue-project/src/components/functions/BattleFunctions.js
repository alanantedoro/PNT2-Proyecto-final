//ESTA FUNCION CALCULA LA EFECTIVIDAD DEL TIPO DEL MOVIMIENTO
//EN RELACION AL POKEMON QUE ESTA SIENDO ATACADO
//RECIBE EL TIPO DEL MOVIMIENTO Y LOS TIPOS DEL POKEMON QUE RECIBE EL ATAQUE
function calculateDebRes(moveType, types) {
	let indice = 1;
	const doubleDamageTo = moveType.damage_relations.double_damage_to;
	const halfDamageTo = moveType.damage_relations.half_damage_to;
	const noDamageTo = moveType.damage_relations.no_damage_to;
	types.forEach(function (type) {
		if (doubleDamageTo.some((tipo) => tipo.name === type.type.name)) {
			indice *= 2;
		}
		if (halfDamageTo.some((tipo) => tipo.name === type.type.name)) {
			indice *= 0.5;
		}
		if (noDamageTo.some((tipo) => tipo.name === type.type.name)) {
			indice = 0;
		}
	});
	return indice;
}

async function calculateDmg(move, offPoke, defPoke) {
	let dmg = 0;
	const atk = obtAtk(move, offPoke);
	const def = obtDef(move, defPoke);
	const response = await fetch(move.type.url);
	const moveType = await response.json();
	const indice = calculateDebRes(moveType, defPoke.types);
	dmg = Math.floor((5 * move.power * (atk / def)) / 50 + 1) * indice;
	return { dmg, indice };
}

function relatedDamageMsg(indice) {
	var msg = "";
	const valorEntero = indice * 10;
	switch (valorEntero) {
		case 0:
			msg = "El ataque no hace efecto";
			break;
		case 5:
			msg = "El ataque es poco efectivo";
			break;
		case 20:
			msg = "El ataque es super efectivo";
			break;
	}
	return msg;
}

function obtAtk(move, offPoke) {
	let atk = 1;
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
	let def = 1;
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
	let dec = 0;
	if (mana < 15 || salud >= hp - 5) {
		dec = Math.floor(Math.random() * 3);
	} else {
		dec = Math.floor(Math.random() * 4);
	}
	return dec;
}

function calculateFastest(pokeUser, pokeEnemy) {
	let first = true;
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
	const id2 = 9;
	const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id2}`);
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
	relatedDamageMsg,
};
