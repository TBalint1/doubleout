import { Schema, model } from "mongoose";

export interface Bot {
    name: string
}

export interface Test {
    id:string;
    type:string;
    count:number;
    question:boolean;
    answer:string;
    bot:Bot[];
}

export const TestSchema = new Schema<Test>(
    {
        type:{type: String, required:true},
        count:{type: Number, required:true},
        question:{type: Boolean, required:true},
        answer:{type: String, required:true},
        bot:
        [
            {
                name:{type: String, required:true},
            },
        ],
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

export const TestModel = model<Test>('test',TestSchema);