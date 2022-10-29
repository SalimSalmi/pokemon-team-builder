import { Fragment, useState } from 'react';
import './App.css';

import TeamBuilder from './Team-builder/Team-builder';
import Pokedex from './Pokedex/Pokedex';
import Selected from './Selected/Selected';

import pokemons from './pokemons';
import types from './data/types.json';
types = types.map(type=>type.name);

const App = () => {
    const [activePanel, setPanel] = useState(false); 
    const togglePanel = () => setPanel(!activePanel);

    const [selectedPokemon, setSelectedPokemon] = useState({});
    const selectPokemon = pokemon => setSelectedPokemon(
        {...selectedPokemon, [pokemon.alias]: pokemon})
    const removePokemon = pokemon => {
        const {[pokemon.alias]: value, ...remaining } = selectedPokemon;
        setSelectedPokemon(remaining)
    }

    const pokedexFeatures = {selectPokemon, types, pokemons}
    const selectFeatures = {selectedPokemon, removePokemon}
    const teamFeatures = {selectedPokemon}
    
    return (
        <Fragment>
            <nav>
                <button onClick={togglePanel}
                        className={activePanel ? '': 'active'}>Pokedex</button>
                <button onClick={togglePanel}
                        className={activePanel ? 'active': ''}>Team Builder</button>
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
    // <main>
    //     <nav>
    //         <button onClick={togglePanel} className={activePanel ? '': 'active'}>
    //             Make Selection
    //         </button>
    //         <button onClick={togglePanel} className={activePanel ? 'active': ''}>
    //             Generate Team
    //         </button>
    //     </nav>
    //         { activePanel ? 
    //             <Team {...teamFeatures} /> :
    //             <Select {...selectFeatures} />
    //         }
    // </main>
    );
}

export default App;
