import './Selected.css';
import Sprite from '../Sprites/Sprite';

const SelectedPokemon = ({pokemon, remove, lock}) => (
    <div className="selected-pokemon">
        <Sprite pokemon={pokemon} />
        <span className="selected-pokemon__button selected-pokemon__remove"
            onClick={() => remove(pokemon)}>X</span>
        <span className={"selected-pokemon__button selected-pokemon__lock " + (!pokemon.locked ? "" :"selected-pokemon__locked")}
            onClick={() => lock(pokemon)}>L</span>
    </div>
)

const Selected = ({selectedPokemon, removePokemon, lockPokemon}) => (
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
                                lock={lockPokemon}
                                key={pokemon.alias} 
                                pokemon={pokemon} />
                        )
                }        
            </div>
        </div>
    </div>
)

export default Selected
