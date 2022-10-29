import './Team.css';
import Sprite from '../Sprites/Sprite';
import PokemonLi from '../Pokemon-li/Pokemon-li';

const Team = ({ team }) => (
    <div className="team">
        {team.map(
            (pokemon) => 
            <div key={pokemon.alias}>
                <PokemonLi pokemon={pokemon} />
            </div>
        )}
    </div>
)


export default Team;
