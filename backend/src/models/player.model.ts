import { Schema, model } from "mongoose";

export interface Player{
    ID:string;
    SHORT_NAME:string;
    GENDER_ID:number
    COUNTRY_NAME:string;
    IMAGE_PATH:string;
    IMAGE_WIDTH:string;
    IMAGE_ID:string;
    NAME:string;
    BIRTHDAY_TIME:string;
    RANK_TEXT:string;
}

export const PlayerSchema = new Schema<Player>(
    {
        SHORT_NAME:{type: String, required:true},
        GENDER_ID:{type: Number, required:true},
        COUNTRY_NAME:{type: String, required:true},
        IMAGE_PATH:{type: String, required:true},
        IMAGE_WIDTH:{type: String, required:true},
        IMAGE_ID:{type: String, required:true},
        NAME:{type: String, required:true},
        BIRTHDAY_TIME:{type: String, required:true},
        RANK_TEXT:{type: String, required:true},
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