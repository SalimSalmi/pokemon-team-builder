import './Type-table.css';

import Type from '../Type/Type';
const types = ["Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground","Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy"]

const TypeTable = ({typeResist, typeWeakness, typeCoverage}) => (
    <table className="type-table">
        <thead>
            <tr>
                <th>Type</th>
                <th>Weakness</th>
                <th>Resist</th>
                <th>Coverage</th>
            </tr>
        </thead>
        <tbody>
            {types.map(type => 
                <tr key={type}>
                    <td> <Type type={type} /> </td>
                    <td> { typeWeakness[type] } </td>
                    <td> { typeResist[type] } </td>
                    <td> { typeCoverage[type] } </td>
                </tr>
            )}
        </tbody>
    </table>
);

export default TypeTable
