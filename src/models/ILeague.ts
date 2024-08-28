import { IPlayer } from "./IPlayer";

type TopScorer = {
    id: number,
    name: string,
    goals: number
}
type TopAssistMan = {
    id: number,
    name: string,
    assists: number
}
type TopCleanSheet = {
    id: number,
    name: string,
    cleanSheets: number
}

interface ILeague {
    name: string,
    country: string,
    numberOfTeams: number,
    currentChampion: string,
    topScorer: TopScorer[],
    topAssistMan: TopAssistMan[],
    topCleanSheet: TopCleanSheet[],
    founded: number,
    format: string,
    clubs: IClub[]
}

interface IClub {
    name: string,
    city: string,
    stadium: string,
    manager: string,
    matchesWon: number,
    matchesDrawn: number,
    matchesLost: number,
    players: IPlayer[]
}

export type { ILeague, IClub, TopAssistMan, TopCleanSheet, TopScorer }