// import sprites from './sprites.png';
import './sprites.css';

const Sprite = ({ pokemon }) => (
    <span title={pokemon.sprite} className="pkm-wrapper">
        <i className={"pkm pkm-" + pokemon.sprite}></i>
    </span>
);

export default Sprite 
