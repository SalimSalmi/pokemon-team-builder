import { Fragment, useState } from 'react';
import './App.css';

import TeamBuilder from './Team-builder/Team-builder';
import Pokedex from './Pokedex/Pokedex';
import Selected from './Selected/Selected';


import pokemons from './pokemons';
const types = ["Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground","Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy"]

const url = new URL(window.location)

const initialSelected = url.searchParams.has('s') ? 
    url.searchParams
    .get('s').split('s').map(n=>pokemons[parseInt(n)])
    .reduce((a,c) => ({...a, [c.alias]: c}),{}) :
    {}


const App = () => {
    const [activePanel, setPanel] = useState(false); 
    const togglePanel = () => setPanel(!activePanel);

    const [selectedPokemon, setSelectedPokemon] =
        useState(initialSelected);
    const selectPokemon = pokemon => setSelectedPokemon(
        {...selectedPokemon, [pokemon.alias]: pokemon});
    const lockPokemon = pokemon => setSelectedPokemon(
        {...selectedPokemon, [pokemon.alias] : {...pokemon, locked : !pokemon.locked}});
    const removePokemon = pokemon => {
        const {[pokemon.alias]: value, ...remaining } = selectedPokemon;
        setSelectedPokemon(remaining)
    }

    const pokedexFeatures = {selectPokemon, types, pokemons}
    const selectFeatures = {selectedPokemon, removePokemon, lockPokemon}
    const teamFeatures = {selectedPokemon}
    
    const selectedNrs = Object.values(selectedPokemon).map(s => 
        pokemons.map(p=>p.alias).indexOf(s.alias)
    )

    selectedNrs.length > 0 ? 
        url.searchParams.set('s', selectedNrs.join('s')) :
        url.searchParams.delete('s')
    window.history.pushState({},'', url)

    return (
        <Fragment>
            <nav>
                <button
                    onClick={togglePanel}
                    className={activePanel ? '': 'active'}>
                    Pokedex
                </button>
                <button 
                    onClick={togglePanel}
                    className={activePanel ? 'active': ''}>
                    Team Builder
                </button>
            </nav>
            <aside>
                <Selected {...selectFeatures} />
            </aside>
            <main>
                {
                    activePanel ?
                    <TeamBuilder {...teamFeatures} /> :
                    <Pokedex {...pokedexFeatures} />
                }
            </main>
        </Fragment>
    );
}

export default App;
