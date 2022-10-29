import './Pokedex.css';
import { useState } from 'react';
import Type from '../Type/Type';
import PokemonListItem from '../Pokemon-li/Pokemon-li';

const Pokedex = ({ pokemons, types, selectPokemon }) => {

    const pokedex = pokemons;
    const [evoFilter, updateEvoFilter] = useState(false);
    const [nameFilter, updateNameFilter] = useState("");
    const [typeFilter, updateTypeFilter] = useState(
        types.reduce((acc, cur) => ({...acc, [cur]: false}), {})
    );
    const toggleType = (type) => updateTypeFilter(
        { ...typeFilter, [type]: !typeFilter[type] }
    );

    const typeFilterInActive = Object.values(typeFilter).every(v=>!v)
    
    const filteredPokedex = pokedex
        .filter(
            (pokemon) => 
                pokemon.name
                    .toLowerCase()
                    .startsWith(nameFilter.toLowerCase())
        )
        .filter(
            (pokemon) => 
                typeFilterInActive || 
                (
                    typeFilter[pokemon.types[0]] || 
                    typeFilter[pokemon.types[1]]
                )
        )
        .filter(
            (pokemon) => 
                !pokemon.evos.length || 
                !evoFilter
        );

    return (
        <div className="pokedex-container">
            <div className="pokedex-header pokedex-header--type">
                Types
            </div>
            <div className="pokedex-header pokedex-header--search">
                <span>Search</span>
                <label>
                    <input type="checkbox" 
                    onChange={() => updateEvoFilter(!evoFilter)} />
                    Final evolutions only
                </label>
            </div>
            <div className="pokedex-types">
                <div className="pokedex-types-container">
                { types.map(type => (
                    <span key={type} onClick={() => toggleType(type)}>
                        <Type type={type} active={typeFilter[type]} />
                    </span>
                ))}    
                </div>
            </div>
            <div className="pokedex-search">
                <input className="pokedex-search-input" type="text" 
                    onChange={(e) => updateNameFilter(e.target.value)}/>
            </div>
            <div className="pokedex-list">
                <div className="pokedex-list-container">
                    { filteredPokedex.map(pokemon => 
                        <div className="pokedex-list-item"
                            key={pokemon.alias} onClick={ 
                                ()=>selectPokemon(pokemon) }>
                            <PokemonListItem pokemon={pokemon} />
                        </div>
                    )}
                </div>
            </div>
        </div>
        //         <div className="pokedex__filter__other">
        //             <label>
        //                 <input type="checkbox" 
        //                 onChange={() => updateEvoFilter(!evoFilter)} />
        //                 Final evolutions
        //             </label>
        //         </div>
            
    )
}

export default Pokedex;
