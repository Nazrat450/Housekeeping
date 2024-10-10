// EncounterTypes.ts
export interface Character {
    id: string;
    name: string;
    hp: number;
    maxHp: number;
    initiative: number;
}

export interface Player extends Character {
    level: number;
    armorClass: number;
}

export interface Monster extends Character {
    attacks: string[];
}

export interface Encounter {
    players: Player[]; // Use the Player type here
    monsters: Monster[];
    currentTurnIndex: number;
}