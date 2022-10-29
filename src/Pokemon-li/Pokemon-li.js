import './Pokemon-li.css';
import Type from '../Type/Type';
import Sprite from '../Sprites/Sprite';

const Pokemon = ({ pokemon }) =>
(
    <div key={pokemon.name} className="pokemon-li">
        <span className="pokemon-li-sprite">
            <Sprite pokemon={pokemon} />
        </span>
        <span className="pokemon-li-name">{pokemon.name}</span>
        <span className="pokemon-li-type">
            <Type type={pokemon.types[0]} />
        </span>
        {
            pokemon.types[1] && 
            <span className="pokemon-li-type">
                <Type type={pokemon.types[1]} />
            </span> 
        }
    </div>
);

export default Pokemon

