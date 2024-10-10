// Encounter.tsx
import React, { useState } from 'react';
import { Character, Monster, Encounter } from '../EncounterTypes';
import { monstersList} from '../Monsters'
import { v4 as uuidv4 } from 'uuid';
import '../Encounter.css'
interface Player extends Character {
    level: number;
    armorClass: number;
}

const EncounterTracker: React.FC = () => {
    const [encounter, setEncounter] = useState<Encounter>({
        players: [],
        monsters: [],
        currentTurnIndex: 0,
    });

    const [selectedMonsterId, setSelectedMonsterId] = useState<string>('');
    const [playerName, setPlayerName] = useState<string>('');
    const [playerLevel, setPlayerLevel] = useState<number>(1);
    const [playerHealth, setPlayerHealth] = useState<number>(100);
    const [playerArmorClass, setPlayerArmorClass] = useState<number>(10);

    // Add a player to the encounter
    const addPlayer = () => {
        const newPlayer: Player = {
            id: uuidv4(),
            name: playerName,
            level: playerLevel,
            hp: playerHealth,
            maxHp: playerHealth,
            initiative: Math.floor(Math.random() * 20) + 1, // Random initiative
            armorClass: playerArmorClass,
        };
        setEncounter((prev) => ({
            ...prev,
            players: [...prev.players, newPlayer],
        }));
        
        

        // Clear the input fields after adding the player
        setPlayerName('');
        setPlayerLevel(1);
        setPlayerHealth(100);
        setPlayerArmorClass(10);
    };

    // Add a monster from the predefined list
    const addMonster = (monsterId: string) => {
        const selectedMonster = monstersList.find((monster) => monster.id === monsterId);
        if (!selectedMonster) return;

        const newMonster: Monster = {
            ...selectedMonster,
            id: uuidv4(), // Generate a new unique ID for this instance
            initiative: Math.floor(Math.random() * 20) + 1, // Random initiative for this encounter
        };

        setEncounter((prev) => ({
            ...prev,
            monsters: [...prev.monsters, newMonster],
        }));
    };
    
    const initiativeOrder = [...encounter.players, ...encounter.monsters].sort(
        (a, b) => b.initiative - a.initiative
    );

    // Advance the turn
    const nextTurn = () => {
        setEncounter((prev) => ({
            ...prev,
            currentTurnIndex: (prev.currentTurnIndex + 1) % initiativeOrder.length 
        }));
    };

    return (
        <div id="encounter-container">
            <h1 id="encounter-title">Encounter Tracker</h1>

            {/* Initiative Order Widget */}
            <div id="initiative-widget">
                <h2>Turn Order</h2>
                <ul>
                    {initiativeOrder.map((character, index) => (
                        <li key={character.id} className={encounter.currentTurnIndex === index ? 'current-turn' : ''}>
                            {encounter.currentTurnIndex === index && <span className="arrow">→ </span>}
                            {character.name} (Initiative: {character.initiative})
                        </li>
                    ))}
                </ul>
            </div>

            <div id="add-player-section">
                <h2>Add Player</h2>
                <input
                    type="text"
                    placeholder="Player Name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Level"
                    value={playerLevel}
                    onChange={(e) => setPlayerLevel(parseInt(e.target.value))}
                />
                <input
                    type="number"
                    placeholder="Health"
                    value={playerHealth}
                    onChange={(e) => setPlayerHealth(parseInt(e.target.value))}
                />
                <input
                    type="number"
                    placeholder="Armor Class"
                    value={playerArmorClass}
                    onChange={(e) => setPlayerArmorClass(parseInt(e.target.value))}
                />
                <button onClick={addPlayer} disabled={!playerName}>Add Player</button>
            </div>

            <div id="add-monster-section">
                <h2>Add Monster</h2>
                <select
                    value={selectedMonsterId}
                    onChange={(e) => setSelectedMonsterId(e.target.value)}
                >
                    <option value="">Select a monster</option>
                    {monstersList.map((monster) => (
                        <option key={monster.id} value={monster.id}>
                            {monster.name}
                        </option>
                    ))}
                </select>
                <button onClick={() => addMonster(selectedMonsterId)} disabled={!selectedMonsterId}>
                    Add Monster
                </button>
            </div>

            <div id="encounter-details">
                <h2>Encounter</h2>
                <button onClick={nextTurn}>Next Turn</button>
                <div id="players-section">
                    <h3>Players</h3>
                    {encounter.players.map((player) => (
                        <div key={player.id} className="player-item">
                            {player.name} (Lvl: {player.level}) - HP: {player.hp}/{player.maxHp} - AC: {player.armorClass} - Initiative: {player.initiative}
                        </div>
                    ))}
                </div>
                <div id="monsters-section">
                    <h3>Monsters</h3>
                    {encounter.monsters.map((monster) => (
                        <div key={monster.id} className="monster-item">
                            {monster.name} - HP: {monster.hp}/{monster.maxHp} - Initiative: {monster.initiative}
                            <ul>
                                {monster.attacks.map((attack, index) => (
                                    <li key={index}>{attack}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div id="current-turn">
                    <h3>Current Turn: {encounter.currentTurnIndex + 1}</h3>
                </div>
            </div>
        </div>
    );
};

export default EncounterTracker;