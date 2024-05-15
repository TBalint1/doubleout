import { Schema, model } from "mongoose";

export class Stat {
  id: string;
  tournamentId: string;
  matchId: string;
  playerId: string;
  average: number;
  checkouts: number;
  numberOf180s: number;
  numberOf140plus: number;
  numberOf100plus: number;
  highestCheckout: number;
  first9DartsAverage: number;
  firstDartAvergrage: number;
  secondDartAverage: number;
  thirdDartAverage: number;
  numberOf3DartCheckouts: number;
  numberOf2DartCheckouts: number;
  numberOf1DartCheckouts: number;
  triple20s: number;
  percentageOf180PerLeg: number;

  constructor(
    id: string,
    tournamentId: string,
    matchId: string,
    playerId: string,
    average: number,
    checkouts: number,
    numberOf180s: number,
    numberOf140plus: number,
    numberOf100plus: number,
    highestCheckout: number,
    first9DartsAverage: number,
    firstDartAvergrage: number,
    secondDartAverage: number,
    thirdDartAverage: number,
    numberOf3DartCheckouts: number,
    numberOf2DartCheckouts: number,
    numberOf1DartCheckouts: number,
    triple20s: number,
    percentageOf180PerLeg: number
  ) {
    this.id = id;
    this.tournamentId = tournamentId;
    this.matchId = matchId;
    this.playerId = playerId;
    this.average = average;
    this.checkouts = checkouts;
    this.numberOf180s = numberOf180s;
    this.numberOf140plus = numberOf140plus;
    this.numberOf100plus = numberOf100plus;
    this.highestCheckout = highestCheckout;
    this.first9DartsAverage = first9DartsAverage;
    this.firstDartAvergrage = firstDartAvergrage;
    this.secondDartAverage = secondDartAverage;
    this.thirdDartAverage = thirdDartAverage;
    this.numberOf3DartCheckouts = numberOf3DartCheckouts;
    this.numberOf2DartCheckouts = numberOf2DartCheckouts;
    this.numberOf1DartCheckouts = numberOf1DartCheckouts;
    this.triple20s = triple20s;
    this.percentageOf180PerLeg = percentageOf180PerLeg;
  }
}

export const StatSchema = new Schema<Stat>(
  {
    tournamentId: { type: String, required: true },
    matchId: { type: String, required: true },
    playerId: { type: String, required: true },
    average: { type: Number, required: true },
    checkouts: { type: Number, required: true },
    numberOf180s: { type: Number, required: true },
    numberOf140plus: { type: Number, required: true },
    numberOf100plus: { type: Number, required: true },
    highestCheckout: { type: Number, required: true },
    first9DartsAverage: { type: Number, required: true },
    firstDartAvergrage: { type: Number, required: true },
    secondDartAverage: { type: Number, required: true },
    thirdDartAverage: { type: Number, required: true },
    numberOf3DartCheckouts: { type: Number, required: true },
    numberOf2DartCheckouts: { type: Number, required: true },
    numberOf1DartCheckouts: { type: Number, required: true },
    triple20s: { type: Number, required: true },
    percentageOf180PerLeg: { type: Number, required: true },
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

export const StatModel = model<Stat>("stat", StatSchema);
