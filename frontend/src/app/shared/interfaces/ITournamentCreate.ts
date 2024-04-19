export interface IMatchSettings{

    points:number;
    legs:number;
    doubleOut:boolean;

}

export interface ITournamentCreate{
    name:string;
    type:string;
    playersCount:number;
    round:string;
    match:IMatchSettings[];
    players:IPlayersData[];
    currentRound:string;
    winner:string;
    runnerUp:string;
}

export interface IPlayersData{
    name:string
}
