import types from '../data/types.json';
types = types.map(type=>type.name);

const reducedTypes = types.reduce((acc, cur) => ({...acc, [cur]: 0}), {})

// Create type map for coverages, resists and weaknesses
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

    const { typeCoverage, typeResist, typeWeakness } = 
        getTeamFeatures(team);

    let score = 0;

    for (let type of types){
        score += Math.min(typeCoverage[type], 1) 
            * multipliers['coverage'];
        score += Math.min(typeResist[type], 1)
            * multipliers['resist'];
        score -= Math.max(1 + typeWeakness[type] - typeResist[type], 0)
            * multipliers['weakness']
        // score -= (1 - Math.max(typeWeakness[type], 1))
        //     * multipliers['weakness']
    }
    return { score, team };
}

export const createOptimalTeam = ( 
        team,
        pokemon,
        multipliers,
        random ) => {
    if (team.length === 6) return scoreTeam(team, multipliers);
    if (team.length + pokemon.length === 6)
        return scoreTeam([...team, ...pokemon], multipliers);

    const option1 = createOptimalTeam(
        [...team, pokemon[0]],
        pokemon.slice(1, pokemon.length),
        multipliers,
        random
    )
    
    const option2 = createOptimalTeam(
        team,
        pokemon.slice(1, pokemon.length),
        multipliers,
        random
    )

    const score = Math.pow(option1.score, 2) /
        (Math.pow(option1.score,2) +
         Math.pow(option2.score,2))

    if (random)
        return score > Math.random() ? option1 : option2 

    if (option1.score == option2.score) 
        return Math.random() > .5 ? option1 : option2

    return option1.score > option2.score ? option1 : option2;
}

