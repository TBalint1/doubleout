import { Schema, model } from "mongoose";

export interface Player {
  id: string;
  name: string;
  tournament_win: number;
  tournament_lose: number;
  match_win: number;
  match_lose: number;
}

export const PlayerSchema = new Schema<Player>(
  {
    name: { type: String, required: true },
    tournament_win: { type: Number, required: true },
    tournament_lose: { type: Number, required: true },
    match_win: { type: Number, required: true },
    match_lose: { type: Number, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },

    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const PlayerModel = model<Player>("player", PlayerSchema);
