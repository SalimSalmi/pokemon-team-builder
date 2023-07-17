import './Team-builder.css';
import { useState } from 'react';
import Team from '../Team/Team';
import { createOptimalTeam, getTeamFeatures } from './Algorithm';

const TeamBuilder = ({ selectedPokemon }) => {
    const [optimalTeam, setOptimalTeam] = useState([]);
    const [teamScore, setTeamScore] = useState(0)
    const [random, setRandom] = useState(false);

    const [resistMultiplier, setResistMultiplier] = useState(2)
    const [weaknessMultiplier, setWeaknessMultiplier] = useState(3)
    const [coverageMultiplier, setCoverageMultiplier] = useState(1)

    const multipliers = {
        resist: resistMultiplier,
        weakness: weaknessMultiplier,
        coverage: coverageMultiplier
    }

    const startOptimalTeam = () => {
        const pokemon = Object.values(selectedPokemon).filter(pokemon => !pokemon.locked);
        const startPokemon = Object.values(selectedPokemon).filter(pokemon => pokemon.locked);
        if (pokemon.length < 6) return
        const {team, score} = 
            createOptimalTeam(startPokemon, pokemon, multipliers, random);
        setOptimalTeam(team)
        setTeamScore(score)
    }

    return (
        <div className="team-builder">
            <header>
                <p><b>Set sliders for prefered team consistancy. The builder will try to get the team as close as it can to the parameters that you set.</b></p>
                <p><b>Guarantee pokemon are included by pressing the lock (L) button.</b></p>
            </header>
            <div className="team-builder-options">
                <div>
                    At least how many resists per type?
                </div>
                <span>
                    {resistMultiplier}
                </span>
                <input onChange={(e) => 
                        setResistMultiplier(e.target.value)}
                    value={resistMultiplier} 
                    type="range" min="0" max="6" />
                <div>
                    At most how many weaknesses per type? 
                </div>
                <span>
                    {weaknessMultiplier}
                </span>
                <input onChange={(e) =>
                            setWeaknessMultiplier(e.target.value)}
                    value={weaknessMultiplier} 
                    type="range" min="0" max="6" />
                <div>
                    At least how many STAB coverage per type?
                </div>
                <span>
                    {coverageMultiplier}
                </span>
                <input onChange={(e) =>
                            setCoverageMultiplier(e.target.value)}
                    value={coverageMultiplier} 
                    type="range" min="0" max="6" />
                <label htmlFor="random">
                    Randomization
                </label>
                <input id="random" type="checkbox" value={random} 
                    onChange={() => setRandom(!random)} />
                <div></div> 
                <button onClick={startOptimalTeam}> Create Team </button>
                <div>Score {teamScore}</div>
            </div>
            { optimalTeam.length > 0 &&
                <div className="team-builder-result">
                    <Team team={ optimalTeam } features={getTeamFeatures(optimalTeam)}/>
                </div>
            }
        </div>
    )
}

export default TeamBuilder;
