import { Schema, model } from "mongoose";

export interface Tournament {
  id: string;
  name: string;
  type: string;
  playersCount: number;
  points: number;
  legs: number;
  doubleOut: boolean;
  players: PlayersData[];
  currentRound: string;
  winner: string;
  runnerUp: string;
}

export interface PlayersData {
  playerName: string;
}

export const TournamentSchema = new Schema<Tournament>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    playersCount: { type: Number, required: true },
    points: { type: Number, required: true },
    legs: { type: Number, required: true },
    doubleOut: { type: Boolean, required: true },
    players: [
      {
        playerName: { type: String, required: true },
      },
    ],
    currentRound: { type: String, required: true },
    winner: { type: String, required: false },
    runnerUp: { type: String, required: false },
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

export const TournamentModel = model<Tournament>(
  "tournament",
  TournamentSchema
);
