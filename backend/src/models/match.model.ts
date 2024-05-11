import { Schema, model } from "mongoose";

export interface TURN {
    SECTOR1:number;
    MULTIPLIER1:number;
    SECTOR2:number;
    MULTIPLIER2:number;
    SECTOR3:number;
    MULTIPLIER:number;
}

export interface SCORE_HISTORY{
    PLAYER:string;
    TURN:TURN;
    SCORE:number;
    VALUE:number;
}

export interface LEG{
    COUNT:number;
    SERVICE_PLAYER:string;
    WINNER:string;
    SCORE_HISTORY:SCORE_HISTORY[];
}


export interface Match{
    ID:string;
    TOURNAMENT_ID:string;
    ROUND:string;
    FIRST_TO:number;
    DOUBLE_OUT: boolean
    HOME_ID:string;
    HOME_NAME:string;
    HOME_SCORE:number;
    AWAY_ID:string;
    AWAY_NAME:string;
    AWAY_SCORE:number;
    LEG:LEG[];
    WINNER:string;
}


export const MatchSchema = new Schema<Match>(
    {
        TOURNAMENT_ID:{type: String,required:true},
        ROUND:{type: String,required:true},
        FIRST_TO:{type: Number, required:true},
        DOUBLE_OUT: {type: Boolean, required:true},
        HOME_ID:{type: String,required:true},
        HOME_NAME:{type: String,required:true},
        HOME_SCORE:{type: Number,required:true},
        AWAY_ID:{type: String,required:true},
        AWAY_NAME:{type: String,required:true},
        AWAY_SCORE:{type: Number,required: true},
        LEG:
        [
            {
              COUNT: { type: Number,required: true},
              SERVICE_PLAYER: { type: String,required:true },
              WINNER: { type: String,required:true },
              SCORE_HISTORY: [
                {
                  PLAYER: { type: String,required:true },
                  TURN: [
                    {
                      SECTOR1: { type: Number, required:true},
                      MULTIPLIER1: { type: Number, required: true},
                      SECTOR2: { type: Number, required:true},
                      MULTIPLIER2: { type: Number, required: true},
                      SECTOR3: { type: Number, required:true},
                      MULTIPLIER3: { type: Number, required: true},
                    },
                  ],
                  SCORE: { type: Number,required:true },
                  VALUE: { type: Number,required:true },
                },
              ],
            },
        ],
          WINNER:{type: String,required:false},
    },{
        toJSON:{
            virtuals:true
        },

        toObject:{
            virtuals:true
        },
        timestamps:true
    }
);

export const MatchModel = model<Match>('match',MatchSchema);