// MonstersData.ts
import { Monster } from './EncounterTypes';

export const monstersList: Monster[] = [
    {
        id: 'goblin',
        name: 'Goblin',
        hp: 15,
        maxHp: 15,
        initiative: 0, 
        attacks: ['Slash', 'Bite'],
    },
    {
        id: 'orc',
        name: 'Orc',
        hp: 30,
        maxHp: 30,
        initiative: 0,
        attacks: ['Axe Swing', 'Headbutt'],
    },
    {
        id: 'dragon',
        name: 'Dragon',
        hp: 150,
        maxHp: 150,
        initiative: 0,
        attacks: ['Fire Breath', 'Tail Whip', 'Claw Swipe'],
    },
    
];