import { Schema, model } from "mongoose";

export interface MatchSettings{

    points:number;
    legs:number;
    doubleOut:boolean;

}

export interface Tournament{
    id:string;
    name:string;
    type:string;
    playersCount:number;
    match:MatchSettings[];
    players:PlayersData[];
    currentRound:string;
    winner:string;
    runnerUp:string;
}

export interface PlayersData{
    name:string
}

export const TournamentSchema = new Schema<Tournament>(
    {
        name:{type: String, required:true},
        type:{type: String, required:true},
        playersCount:{type: Number, required:true},
        match:
        [
            {
                points:{type: Number, required:true},
                legs:{type: Number, required:true},
                double_out:{type: Boolean, required:true},
            },
        ],
        players:
        [
            {
                name:{type: String, required:true},
            },
        ],
        currentRound:{type: String, required:true},
        winner:{type: String, required:false},
        runnerUp:{type: String, required:false},
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