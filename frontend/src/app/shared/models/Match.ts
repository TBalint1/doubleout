import { Leg } from "./Leg";

export class Match{
    id!:string;
    tournament_id!:string;
    firstTo!:string;
    doubleOut!:boolean;
    home_id!:string;
    home_name!:string;
    home_score!:number;
    away_id!:string;
    away_name!:string;
    away_score!:number;
    leg!:Leg[];
    winner!:string;
}