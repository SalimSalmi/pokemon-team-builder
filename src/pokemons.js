import pokemons from './data/pokedex';

const abilities = {
    'Dry Skin':'Water',
    'Flash Fire':'Fire',
    'Levitate':'Ground',
    'Lightningrod':'Electric',
    'Sap Sipper':'Grass',
    'Motor Drive':'Elecric',
    'Storm Drain':'Water',
    'Volt Absorb':'Electric',
    'Water Absorb':'Water'
}

const mapPokemonTypes = (pokemons, types) => {

    const getTypeAdvantage = (pokemon) => {
        
        const typeAdvantage = {}

        for (let attackingType of Object.values(types)) {
            let advantage = 1;
            for (let defendingType of pokemon.types) {
                    
                if (attackingType.immunes.includes(defendingType)) 
                    advantage = 0;
                
                if (attackingType.weaknesses.includes(defendingType))
                    advantage *= 0.5;

                if (attackingType.strengths.includes(defendingType))
                    advantage *= 2;

            }

            typeAdvantage[attackingType.name] = advantage;
        }

        for (let ability of Object.values(pokemon.abilities)) 
            if (Object.keys(abilities).includes(ability))
                typeAdvantage[abilities[ability]] = 0;

        return {...pokemon, typeAdvantage }
    }

    const getTypeCoverage = (pokemon) => {
        const typeCoverage = {}

        for (let defendingType of Object.keys(types)) {
            let advantage = 0;
            for (let attackingType of pokemon.types){
                console.log(types[attackingType], defendingType)
                if(types[attackingType].strengths.includes(defendingType))
                    advantage = 1;
            }
            typeCoverage[defendingType] = advantage;
        }

        return {...pokemon, typeCoverage}
    }
    
    return Object.values(pokemons)
        .map(getTypeAdvantage)
        .map(getTypeCoverage)
}

const types = {
    "Normal": {
        "name":"Normal",
        "immunes":["Ghost"],
        "weaknesses":["Rock","Steel"],
        "strengths":[]
    },
    "Fire": {
        "name":"Fire",
        "immunes":[],
        "weaknesses":["Fire","Water","Rock","Dragon"],
        "strengths":["Grass","Ice","Bug","Steel"]
    },
    "Water": {
        "name":"Water",
        "immunes":[],
        "weaknesses":["Water","Grass","Dragon"],
        "strengths":["Fire","Ground","Rock"]
    },
    "Electric": {
        "name":"Electric",
        "immunes":["Ground"],
        "weaknesses":["Electric","Grass","Dragon"],
        "strengths":["Water","Flying"]
    },
    "Grass": {
        "name":"Grass",
        "immunes":[],
        "weaknesses":["Fire","Grass","Poison","Flying","Bug","Dragon","Steel"],
        "strengths":["Water","Ground","Rock"]
    },
    "Ice": {
        "name":"Ice",
        "immunes":[],
        "weaknesses":["Fire","Water","Ice","Steel"],
        "strengths":["Grass","Ground","Flying","Dragon"]
    },
    "Fighting": {"name":"Fighting","immunes":["Ghost"],"weaknesses":["Poison","Flying","Psychic","Bug","Fairy"],"strengths":["Normal","Ice","Rock","Dark","Steel"]},
    "Poison": {"name":"Poison","immunes":["Steel"],"weaknesses":["Poison","Ground","Rock","Ghost"],"strengths":["Grass","Fairy"]},
    "Ground": {"name":"Ground","immunes":["Flying"],"weaknesses":["Grass","Bug"],"strengths":["Fire","Electric","Poison","Rock","Steel"]},
    "Flying": {"name":"Flying","immunes":[],"weaknesses":["Electric","Rock","Steel"],"strengths":["Grass","Fighting","Bug"]},
    "Psychic": {"name":"Psychic","immunes":["Dark"],"weaknesses":["Psychic","Steel"],"strengths":["Fighting","Poison"]},
    "Bug": {"name":"Bug","immunes":[],"weaknesses":["Fire","Fighting","Poison","Flying","Ghost","Steel","Fairy"],"strengths":["Grass","Psychic","Dark"]},
    "Rock": {"name":"Rock","immunes":[],"weaknesses":["Fighting","Ground","Steel"],"strengths":["Fire","Ice","Flying","Bug"]},
    "Ghost": {"name":"Ghost","immunes":["Normal"],"weaknesses":["Dark"],"strengths":["Psychic","Ghost"]},
    "Dragon": {"name":"Dragon","immunes":["Fairy"],"weaknesses":["Steel"],"strengths":["Dragon"]},
    "Dark": {"name":"Dark","immunes":[],"weaknesses":["Fighting","Dark","Fairy"],"strengths":["Psychic","Ghost"]},
    "Steel": {"name":"Steel","immunes":[],"weaknesses":["Fire","Water","Electric","Steel"],"strengths":["Ice","Rock","Fairy"]},
    "Fairy": {"name":"Fairy","immunes":[],"weaknesses":["Fire","Poison","Steel"],"strengths":["Fighting","Dragon","Dark"]}

}


export default mapPokemonTypes(pokemons, types);
