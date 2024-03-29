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

export class Throws{
    EVENT_ID!:string;
    LEG!:LEG[];
}