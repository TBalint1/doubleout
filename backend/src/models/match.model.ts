import { Schema, model } from "mongoose";

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


export interface Match{
    ID:string;
    STAGE_ID:string;
    ROUND:string;
    START:string;
    HOME_ID:string;
    HOME_NAME:string;
    HOME_IMG:string;
    HOME_SCORE:number;
    AWAY_ID:string;
    AWAY_NAME:string;
    AWAY_IMG:string;
    AWAY_SCORE:number;
    LEG:LEG[];
    WINNER:string;
}


export const MatchSchema = new Schema<Match>(
    {
        STAGE_ID:{type: String,required:true},
        ROUND:{type: String,required:true},
        START:{type: String,required:true},
        HOME_ID:{type: String,required:true},
        HOME_NAME:{type: String,required:true},
        HOME_IMG:{type: String,required:true},
        HOME_SCORE:{type: Number,required:true},
        AWAY_ID:{type: String,required:true},
        AWAY_NAME:{type: String,required:true},
        AWAY_IMG:{type: String,required:true},
        AWAY_SCORE:{type: Number,required:true},
        LEG:
        [
            {
              SERVICE_PLAYER: { type: String,required:true },
              WINNER: { type: String,required:true },
              MAIN_SCORE: [
                {
                  PLAYER: { type: String,required:true },
                  VALUE: { type: Number,required:true },
                  IS_CHANGED: { type: Number,required:true },
                },
              ],
              SCORE_HISTORY: [
                {
                  PLAYER: { type: String,required:true },
                  SCORE: { type: Number,required:true },
                  VALUE: { type: Number,required:true },
                },
              ],
            },
          ],
          WINNER:{type: String,required:true},
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

export const PlayerModel = model<Match>('match',MatchSchema);