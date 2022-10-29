import './Selected.css';
import Sprite from '../Sprites/Sprite';

const SelectedPokemon = ({pokemon, remove}) => (
    <div className="selected-pokemon"
        onClick={() => remove(pokemon)}>
        <Sprite pokemon={pokemon} />
    </div>
)

const Selected = ({selectedPokemon, removePokemon}) => (
    <div className="selected-container">
        <div className="selected-head">Selected</div>
        <div className="selected-list">
            <div className="selected-list-container">
                {
                    Object
                        .values(selectedPokemon)
                        .reverse()
                        .map( pokemon => 
                            <SelectedPokemon 
                                remove={removePokemon}
                                key={pokemon.alias} 
                                pokemon={pokemon} />
                        )
                }        
            </div>
        </div>
    </div>
)

export default Selected
