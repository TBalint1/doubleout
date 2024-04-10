import { Schema, model } from "mongoose";

export interface Player{
    ID:string;
    NAME:string;
    TOURNAMENT_WIN: number;
    TOURNAMENT_LOSE: number;
    MATCH_WIN: number;
    MATCH_LOSE: number;     
}

export const PlayerSchema = new Schema<Player>(
    {
        NAME:{type: String, required:true},
        TOURNAMENT_WIN:{type: Number, required:true},
        TOURNAMENT_LOSE:{type: Number, required: true},
        MATCH_WIN:{type: Number, required: true},
        MATCH_LOSE:{type: Number, required: true},
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

export const PlayerModel = model<Player>('player',PlayerSchema);