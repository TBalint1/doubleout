import { Schema, model } from "mongoose";

export interface MATCH{

    POINTS:number;
    SETS:number;
    LEGS:number;
    DOUBLE_OUT:boolean;
    DOUBLE_IN:boolean;

}

export interface Tournament{
    NAME:string;
    TYPE:string;
    PLAYERS_COUNT:number;
    ROUND:string;
    FINAL_FOUR:boolean;
    START_DATE:string;
    MATCH:MATCH[];
    PLAYERS:PLAYERS[];
    CURRENT_ROUND:string;
    WINNER:string;
    RUNNER_UP:string;
}

export interface PLAYERS{
    NAME:string
}

export const TournamentSchema = new Schema<Tournament>(
    {
        NAME:{type: String, required:true},
        TYPE:{type: String, required:true},
        PLAYERS_COUNT:{type: Number, required:true},
        ROUND:{type: String, required:true},
        FINAL_FOUR:{type: Boolean, required:true},
        START_DATE:{type: String, required:true},
        MATCH:
        [
            {
                POINTS:{type: Number, required:true},
                SETS:{type: Number, required:true},
                LEGS:{type: Number, required:true},
                DOUBLE_OUT:{type: Boolean, required:true},
                DOUBLE_IN:{type: Boolean, required:true},
            },
        ],
        PLAYERS:
        [
            {
                NAME:{type: String, required:true},
            },
        ],
        CURRENT_ROUND:{type: String, required:true},
        WINNER:{type: String, required:true},
        RUNNER_UP:{type: String, required:true},
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

export const TournamentModel = model<Tournament>('tournament',TournamentSchema);