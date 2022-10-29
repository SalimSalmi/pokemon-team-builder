import './Type.css';


const Type = ({type, active}) => (
    <div key={type} className={"pokemon-type " + type + (active ? " active" : "")}>{type}</div>
);

export default Type;
