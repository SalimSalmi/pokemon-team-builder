import {matrix, multiply, transpose, sum, boolean} from 'mathjs';

const buildTypeMatrix = (pokemons) => {

    const resist = transpose(matrix(pokemons.map(pokemon =>
        Object.values(pokemon.typeAdvantage).map(
            type => + type > 1
        ))));

    const weak = transpose(matrix(pokemons.map(pokemon =>
        Object.values(pokemon.typeAdvantage).map(
            type => + type < 1
        ))));

    const coverage = transpose(matrix(pokemons.map(pokemon =>
        Object.values(pokemon.typeCoverage))));

    return {resist, weak, coverage}
}

const fullCoverage = (coverage, team) => {
    const teamCoverage = multiply(coverage, team);
    return sum(boolean(teamCoverage)) === 18;
}

const fullResist = (resist, team) => {
    const teamResist = multiply(resist, team);
    return sum(boolean(teamResist)) === 18;
}

const baseRestrictions = (resist, coverage, team) => (
    fullCoverage(coverage,team) && fullResist(resist, team)
)

const minWeakness = (resist, weak, team) => {
    const teamWeak = multiply(weak, team);
    const teamResist = multiply(resist, team);
}

const test = (pokemons) => {
    const team = pokemons.map(()=>1);
    team[0] = 1
    team[1] = 1
    const {resist, weak, coverage} = buildTypeMatrix(pokemons);  
    console.log(team);
    console.log(multiply(resist, team));
    console.log(sum(boolean(multiply(resist, matrix(team)))));
    console.log(baseRestrictions(resist, coverage, team))
}

export default test
