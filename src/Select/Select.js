import { Fragment } from 'react';

import './Select.css';

import Pokedex from '../Pokedex/Pokedex';
import PokemonListItem from '../Pokemon-li/Pokemon-li';

import pokemons from '../pokemons';
import types from '../data/types.json';
types = types.map(type=>type.name);
        
const Select = ({selectedPokemon, addSelectedPokemon}) => {
    const selectPokemon = pokemon => addSelectedPokemon(
        {...selectedPokemon, [pokemon.alias]: pokemon})
    
    const pokedexFeatures = {selectPokemon, types, pokemons}

    return (
    <div className="container container--split">
        <div className="selected">
                {Object.values(selectedPokemon).map(pokemon =>
                    <PokemonListItem pokemon={pokemon} />
                )}
        </div>
        <Pokedex {...pokedexFeatures} />
    </div>
    );
}

export default Select;

