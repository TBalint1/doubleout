import { MatchSettings } from "./MatchSettings";
import { PlayersData } from "./PlayerData";



export class Tournament{
    id!:string;
    name!:string;
    type!:string;
    playersCount!:number;
    round!:string;
    match!:MatchSettings[];
    players!:PlayersData[];
    currentRound!:string;
    winner!: string;
    runnerUp!:string;
}