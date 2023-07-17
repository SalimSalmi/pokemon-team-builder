import './Team.css';
import Sprite from '../Sprites/Sprite';
import Type from '../Type/Type';
const types = ["Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground","Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy"]

const multColor = (pokemon, type) => {
    const value = pokemon.typeAdvantage[type]
    if (value < 1) return 'green';
    if (value > 1) return 'red';
    return ''
}

const Team = ({ team, features }) => {
    const {typeResist, typeWeakness, typeCoverage} = features;

    return (
    <table>
        <thead>
            <tr>
                <th></th>
                { team.map(pokemon => <th key={pokemon.alias}><Sprite pokemon={pokemon} /></th>) }
                <th>Weaknesses</th>
                <th>Resists</th>
                <th>Coverage</th>
            </tr>
        </thead>
        <tbody>
            {types.map(type => (
                <tr key={type}>
                    <td> <Type type={type} /> </td>
                    
                    { team.map(pokemon => <td key={pokemon.alias} className={multColor(pokemon, type)}>{pokemon.typeAdvantage[type]}</td>) }

                    <td> { typeWeakness[type] } </td>
                    <td> { typeResist[type] } </td>
                    <td> { typeCoverage[type] } </td>
                </tr>
            ))}    
        </tbody>
    </table>
)}

// const Team = ({ team }) => (
//     <div className="team">
//         {team.map(
//             (pokemon) => 
//             <div key={pokemon.alias}>
//                 <PokemonLi pokemon={pokemon} />
//             </div>
//         )}
//     </div>
// )


export default Team;
