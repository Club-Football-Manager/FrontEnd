import { IClub } from "./ILeague"
interface IMatch {
    homeTeam: IClub,
    awayTeam: IClub,
    date: Date,
    matchDay: number
}

export type {IMatch}