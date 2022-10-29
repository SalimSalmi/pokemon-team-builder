import pokemons from './data/pokedex.json';
import types from './data/types.json';

const getTypeAdvantage = (pokemon) => {
    
    const typeAdvantage = {}

    for (let attackingType of types) {
        let advantage = 1;
        for (let defendingType of pokemon.types) {
                
            if (attackingType.immunes.includes(defendingType)) 
                advantage = 0;
            
            if (attackingType.weaknesses.includes(defendingType))
                advantage *= 0.5;

            if (attackingType.strengths.includes(defendingType))
                advantage *=2;
        }

        typeAdvantage[attackingType.name] = advantage;
    }

    return {...pokemon, typeAdvantage }
}

const getTypeCoverage = (pokemon) => {
    const typeCoverage = {}

    for (let defendingType of types) {
        let advantage = 0;
        for (let attackingType of pokemon.types)
            advantage += defendingType.weaknesses.includes(attackingType);
        typeCoverage[defendingType.name] = advantage;
    }

    return {...pokemon, typeCoverage}
}
export default Object.values(pokemons).map(getTypeAdvantage).map(getTypeCoverage)
