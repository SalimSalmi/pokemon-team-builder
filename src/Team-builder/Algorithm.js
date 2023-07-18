const types = ["Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground","Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy"]
const reducedTypes = types.reduce((acc, cur) => ({...acc, [cur]: 0}), {})

export const getTeamFeatures = ( team ) => {
    const typeCoverage = {...reducedTypes}
    const typeResist = {...reducedTypes}
    const typeWeakness = {...reducedTypes}
    
    for ( let type of types ) {
        for ( let pokemon of team ) { 
            typeCoverage[type] += pokemon.typeCoverage[type];
            typeResist[type] += pokemon.typeAdvantage[type] < 1;
            typeWeakness[type] += pokemon.typeAdvantage[type] > 1;
        }
    }

    return { typeCoverage, typeResist, typeWeakness }
}

export const scoreTeam = ( team, multipliers ) => {

    const { typeCoverage, typeResist, typeWeakness } = getTeamFeatures(team);

    let score = 0;
    for (let type of types) {
        score += Math.min(typeCoverage[type], multipliers['coverage']);
        score += Math.min(typeResist[type], multipliers['resist']);
        score += 6 - Math.max(typeWeakness[type], multipliers['weakness']);
    }
    return { score, team };
}


// const getUniqueTypes = (pokemons) => pokemons
//     .reduce(
//     (acc, cur) => ({
//         ...acc,
//         [cur.types.toString() + cur.abilities.filter(a => Object.keys(abilities).includes(a)).toString()]:
//             ({
//                 types : cur.types,
//                 abilities : cur.abilities.filter(a => Object.keys(abilities).includes(a)),
//                 typeCoverage : cur.typeCoverage,
//                 typeAdvantage : cur.typeAdvantage
//             })
//         }), {})

// const selectPokemonOfType = (lockedPokemon, pokemons, type) => {
//
//             const eligibleLocked = lockedPokemon.filter(
//                     pokemon => pokemon.types.toString() === type);
//
//             if (eligibleLocked.length > 0) 
//                 return eligibleLocked[Math.floor(Math.random() * eligibleLocked.length)]
//
//             const eligible = pokemons.filter(
//                     pokemon => pokemon.types.toString() === type);
//
//             return eligible[Math.floor(Math.random() * eligible.length)]
//     }

const optimalTypes = ( 
        team,
        pokemon,
        multipliers,
        random ) => {
    if (team.length === 6) return scoreTeam(team, multipliers);
    if (pokemon.length === 0) return { score: -10000, team }

    const newPokemon = pokemon[0];
    pokemon = pokemon.slice(1, pokemon.length);

    const option1 = optimalTypes(
        [...team, newPokemon],
        pokemon,
        multipliers,
        random
    )
    
    const option2 = optimalTypes(
        team,
        pokemon,
        multipliers,
        random
    )

    if (random) {
        const score = Math.pow(option1.score, 2) /
            (Math.pow(option1.score,2) +
             Math.pow(option2.score,2))
        return score > Math.random() ? option1 : option2 
    }

    if (option1.score === option2.score) 
        return Math.random() > .5 ? option1 : option2

    return option1.score > option2.score ? option1 : option2;
}


export const createOptimalTeam = (
        lockedPokemon,
        pokemon,
        multipliers,
        random ) => {

    pokemon = pokemon
        .map(pokemon => ({...pokemon, types: pokemon.types.sort()}));

    lockedPokemon = lockedPokemon
        .map(pokemon => ({...pokemon, types: pokemon.types.sort()}));

    // const selectableTypes= Object.values(getUniqueTypes(pokemon));
    // const lockedTypes = Object.values(getUniqueTypes(lockedPokemon));
    const {score, team} = optimalTypes(
        lockedPokemon, pokemon, multipliers, random)

    return {
        score,
        team
        // : team.map(type =>
        //     selectPokemonOfType(lockedPokemon, pokemon, type.types.toString()))
    }
}
