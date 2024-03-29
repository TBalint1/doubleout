import { Schema, model } from "mongoose";

export interface WorldRanking{
    rank:string;
    id:string;
    playerName:string;
    playerImg:number;
    playerTypeID:number;
    result:string;
}

export const RankingSchema = new Schema<WorldRanking>(
    {
        rank:{type: String, required:true},
        id:{type: String, required:true},
        playerName:{type: String, required:true},
        playerImg:{type: Number, required:true},
        playerTypeID:{type: Number, required:true},
        result:{type: String, required:true},
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

export const RankingModel = model<WorldRanking>('ranking',RankingSchema);