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

	return indice;
}

function calculateDmg(move, offPoke, defPoke) {
	var dmg = 0;
	const atk = this.obtAtk(move, offPoke);
	const def = this.obtDef(move, defPoke);
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
