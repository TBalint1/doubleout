export interface MAIN_SCORE{
    PLAYER:string;
    VALUE:number;
    IS_CHANGED:number;
}

export interface SCORE_HISTORY{
    PLAYER:string;
    SCORE:number;
    VALUE:number;
}

export interface LEG{
    SERVICE_PLAYER:string;
    WINNER:string;
    MAIN_SCORE:MAIN_SCORE[];
    SCORE_HISTORY:SCORE_HISTORY[];
}


export class Match{
    ID!:string;
    STAGE_ID!:string;
    ROUND!:string;
    START!:string;
    HOME_ID!:string;
    HOME_NAME!:string;
    HOME_IMG!:string;
    HOME_SCORE!:number;
    AWAY_ID!:string;
    AWAY_NAME!:string;
    AWAY_IMG!:string;
    AWAY_SCORE!:number;
    LEG!:LEG[];
    WINNER!:string;
}