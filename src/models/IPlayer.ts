interface ISkill {
    passing: string;
    shooting: string;
    tackling: string;
    saving: string;
    agility: string;
    strength: string;
    penalty_taking: string;
    jumping: string;
}

interface IPlayer {
    id: string
    image: string
    name: string;
    position: string;
    rating: string;
    skill: ISkill;
    currentPOS: number[];
    fitness: number;
    injured: boolean;
}

export type { IPlayer, ISkill }
