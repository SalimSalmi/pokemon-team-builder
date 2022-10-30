import './Team-builder.css';

import { Fragment, useState } from 'react';

import Team from '../Team/Team';
import TypeTable from '../Type-table/Type-table';

import { createOptimalTeam, getTeamFeatures } from './Algorithm';

const TeamBuilder = ({ selectedPokemon }) => {
    const [optimalTeam, setOptimalTeam] = useState([]);
    const [teamScore, setTeamScore] = useState(0)
    const [random, setRandom] = useState(false);

    const [resistMultiplier, setResistMultiplier] = useState(4)
    const [weaknessMultiplier, setWeaknessMultiplier] = useState(2)
    const [coverageMultiplier, setCoverageMultiplier] = useState(1)

    const multipliers = {
        resist: resistMultiplier,
        weakness: weaknessMultiplier,
        coverage: coverageMultiplier
    }

    const startOptimalTeam = () => {
        const pokemon = Object.values(selectedPokemon);
        if (pokemon.length < 6) return
        const {team, score} = 
            createOptimalTeam([], pokemon, multipliers, random);
        setOptimalTeam(team)
        setTeamScore(score)
    }

    return (
        <div className="team-builder">
            <div className="team-builder-options">
                <div>
                    Broad type resistance
                </div>
                <input onChange={(e) => 
                        setResistMultiplier(e.target.value)}
                    value={resistMultiplier} 
                    type="range" min="1" max="10" />
                <div>
                    Few weaknesses
                </div>
                <input onChange={(e) =>
                            setWeaknessMultiplier(e.target.value)}
                    value={weaknessMultiplier} 
                    type="range" min="1" max="10" />
                <div>
                    Broad type coverage
                </div>
                <input onChange={(e) =>
                            setCoverageMultiplier(e.target.value)}
                    value={coverageMultiplier} 
                    type="range" min="1" max="10" />
                <label htmlFor="random">
                    Randomization
                </label>
                <input id="random" type="checkbox" value={random} 
                    onChange={() => setRandom(!random)} />
                
                <button onClick={startOptimalTeam}> Create Team </button>
                <div>Score {teamScore}</div>
            </div>
            { optimalTeam.length > 0 &&
                <Fragment>
                    <div className="team-builder-result">
                        <Team team={ optimalTeam } />
                    </div>
                    <div className="team-builder-stats">
                        <TypeTable {...getTeamFeatures(optimalTeam)}/>
                    </div>
                </Fragment>
            }
        </div>
    )
}

export default TeamBuilder;
