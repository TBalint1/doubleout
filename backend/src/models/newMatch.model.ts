import { Schema, model } from "mongoose";

export class Match {
  id: string;
  tournamentId: string;
  round: string;
  firstTo: number;
  doubleOut: boolean;
  points: number;
  winner: string;
  homeId: string;
  homeName: string;
  homeScore: number;
  awayId: string;
  awayName: string;
  awayScore: number;
  legs: Leg[];

  constructor(
    id: string,
    tournamentId: string,
    round: string,
    firstTo: number,
    doubleOut: boolean,
    points: number,
    winner: string,
    homeId: string,
    homeName: string,
    homeScore: number,
    awayId: string,
    awayName: string,
    awayScore: number,
    legs: Leg[]
  ) {
    this.id = id;
    this.tournamentId = tournamentId;
    this.round = round;
    this.firstTo = firstTo;
    this.doubleOut = doubleOut;
    this.winner = winner;
    this.points = points;
    this.homeId = homeId;
    this.homeName = homeName;
    this.homeScore = homeScore;
    this.awayId = awayId;
    this.awayName = awayName;
    this.awayScore = awayScore;
    this.legs = legs;
  }
}

export class Leg {
  starterPlayer: string;
  homePoint: number;
  awayPoint: number;
  winner: string;
  turns: Turn[];

  constructor(
    starterPlayer: string,
    winner: string,
    homepoint: number,
    awaypoint: number,
    turns: Turn[]
  ) {
    this.starterPlayer = starterPlayer;
    this.winner = winner;
    this.turns = turns;
    this.homePoint = homepoint;
    this.awayPoint = awaypoint;
  }
}

export class Turn {
  playerId: string;
  throw1Sector: number;
  throw1Multiplier: number;
  throw2Sector: number;
  throw2Multiplier: number;
  throw3Sector: number;
  throw3Multiplier: number;

  constructor(
    playerId: string,
    throw1Sector: number,
    throw1Multiplier: number,
    throw2Sector: number,
    throw2Multiplier: number,
    throw3Sector: number,
    throw3Multiplier: number
  ) {
    this.playerId = playerId;
    this.throw1Sector = throw1Sector;
    this.throw1Multiplier = throw1Multiplier;
    this.throw2Sector = throw2Sector;
    this.throw2Multiplier = throw2Multiplier;
    this.throw3Sector = throw3Sector;
    this.throw3Multiplier = throw3Multiplier;
  }
}

export const NewMatchSchema = new Schema<Match>(
  {
    tournamentId: { type: String, required: true },
    round: { type: String, required: true },
    firstTo: { type: Number, required: true },
    doubleOut: { type: Boolean, required: true },
    points: { type: Number, required: true },
    winner: { type: String, required: false },
    homeId: { type: String, required: true },
    homeName: { type: String, required: true },
    homeScore: { type: Number, required: true },
    awayId: { type: String, required: true },
    awayName: { type: String, required: true },
    awayScore: { type: Number, required: true },
    legs: [
      {
        starterPlayer: { type: String, required: true },
        homePoint: { type: Number, required: true },
        awayPoint: { type: Number, required: true },
        winner: { type: String, required: true },
        turns: [
          {
            playerId: { type: String, required: false },
            throw1Sector: { type: Number, required: false },
            throw1Multiplier: { type: Number, required: false },
            throw2Sector: { type: Number, required: false },
            throw2Multiplier: { type: Number, required: false },
            throw3Sector: { type: Number, required: false },
            throw3Multiplier: { type: Number, required: false },
          },
        ],
      },
    ],
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

export const NewMatchModel = model<Match>("newMatch", NewMatchSchema);
