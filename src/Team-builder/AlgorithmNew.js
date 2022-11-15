import {matrix, multiply, transpose, sum} from 'mathjs';


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

const objective = (selection, resist, weak, coverage) => (
    multiply(coverage, selection) +
    multiply(resist, selection) -
    multiply(weak, selection)
)

const teamSizeConstraint = (selection) => (
    sum(selection) <= 6
)

const test = (pokemons) => {
    const team = pokemons.map(()=>0);
    team[0] = 1
    team[10] = 1
    const {resist, weak, coverage} = buildTypeMatrix(pokemons);  
    console.log(team);
    console.log(multiply(resist, matrix(team)));
}

export default test
