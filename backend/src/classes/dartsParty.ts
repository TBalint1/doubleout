import { TURN } from "../models/match.model";
import { Leg, Match, Turn } from "../models/newMatch.model";
import { Stat } from "../models/stat.model";

const possible3DartsCheckouts = [
  170, 167, 164, 161, 160, 158, 157, 156, 155, 154, 153, 152, 151, 150, 149,
  148, 147, 146, 145, 144, 143, 142, 141, 140, 139, 138, 137, 136, 135, 134,
  133, 132, 131, 130, 129, 128, 127, 126, 125, 124, 123, 122, 121, 120, 119,
  118, 117, 116, 115, 114, 113, 112, 111, 110, 109, 108, 107, 106, 105, 104,
  103, 102, 101, 99,
];

const possible2DartsCheckouts = [
  100, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81,
  80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62,
  61, 60, 59, 58, 57, 56, 55, 54, 53, 52, 51, 49, 48, 47, 46, 45, 44, 43, 42,
  41, 39, 37, 35, 33, 31, 29, 27, 25, 23, 21, 19, 17, 15, 13, 11, 9, 7, 5, 3,
];

const possible1DartCheckout = [
  50, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4,
  2,
];

export class DartsParty {
  match: Match;
  homeStat: Stat;
  awayStat: Stat;
  currentLeg: Leg;
  servicePlayer: string;
  homeTurnCount: number;
  awayTurnCount: number;
  homePossibleCheckoutCount: number;
  awayPossibleCheckoutCount: number;
  homeCheckoutCount: number;
  awayCheckoutCount: number;
  constructor(match: Match, homeStat: Stat, awayStat: Stat) {
    this.match = match;
    this.homeStat = homeStat;
    this.awayStat = awayStat;
    this.currentLeg = new Leg(
      this.match.homeId,
      "",
      this.match.points,
      this.match.points,
      []
    );
    this.servicePlayer = this.match.homeId;
    this.homeTurnCount = 0;
    this.awayTurnCount = 0;
    this.homePossibleCheckoutCount = 0;
    this.awayPossibleCheckoutCount = 0;
    this.homeCheckoutCount = 0;
    this.awayCheckoutCount = 0;
  }

  start(): Match {
    this.match.legs.push(this.currentLeg);
    return this.match;
  }

  thrown(turn: Turn): Match | undefined {
    if (
      this.currentLeg.turns.length === 0 &&
      this.currentLeg.starterPlayer !== turn.playerId
    ) {
      return undefined;
    }
    const dart1 = turn.throw1Sector * turn.throw1Multiplier;
    const dart2 = turn.throw2Sector * turn.throw2Multiplier;
    const dart3 = turn.throw3Sector * turn.throw3Multiplier;
    const thrownPoints = dart1 + dart2 + dart3;
    const previousTurn =
      this.currentLeg.turns?.[this.currentLeg.turns.length - 1]?.playerId;
    console.log(previousTurn);
    console.log(turn.playerId);
    if (previousTurn === undefined || previousTurn !== turn.playerId) {
      let currentPlayer = turn.playerId;
      console.log("Bent vagyok");
      console.log(this.currentLeg.turns);
      this.currentLeg.turns.push(turn);
      console.log(this.currentLeg.turns);
      console.log("Jelenlegi Leg");
      console.log(this.currentLeg);
      console.log("Meccs");
      console.log(this.match);
      if (this.match.doubleOut === true) {
        if (currentPlayer === this.match.homeId) {
          const currentPoint = this.currentLeg.homePoint - dart1;
          if (currentPoint === 0 && turn.throw1Multiplier === 2) {
            this.currentLeg.winner = this.match.homeId;
            this.currentLeg.homePoint = currentPoint;
            this.match.homeScore++;
            this.startNewLegIfpossible();
          } else if (currentPoint > 0) {
            const currenPoint = currentPoint - dart2;
            if (currenPoint === 0 && turn.throw2Multiplier === 2) {
              this.currentLeg.winner = this.match.homeId;
              this.currentLeg.homePoint = currentPoint;
              this.match.homeScore++;
              this.startNewLegIfpossible();
            } else if (currenPoint > 0) {
              const currentPoint = currenPoint - dart3;
              if (currentPoint === 0 && turn.throw3Multiplier === 2) {
                this.currentLeg.winner = this.match.homeId;
                this.currentLeg.homePoint = currentPoint;
                this.match.homeScore++;
                this.startNewLegIfpossible();
              } else if (currentPoint > 0) {
                if (
                  possible3DartsCheckouts.includes(this.currentLeg.homePoint) ||
                  possible2DartsCheckouts.includes(this.currentLeg.homePoint) ||
                  possible1DartCheckout.includes(this.currentLeg.homePoint)
                ) {
                }
                this.currentLeg.homePoint = currentPoint;
              }
            }
          }
          currentPlayer = this.match.awayId;
        } else {
          const currentPoint = this.currentLeg.awayPoint - dart1;
          if (currentPoint === 0 && turn.throw1Multiplier === 2) {
            this.currentLeg.winner = this.match.awayId;
            this.currentLeg.awayPoint = currentPoint;
            this.match.awayScore++;
            this.startNewLegIfpossible();
          } else if (currentPoint > 0) {
            const currenPoint = currentPoint - dart2;
            if (currenPoint === 0 && turn.throw2Multiplier === 2) {
              this.currentLeg.winner = this.match.awayId;
              this.currentLeg.awayPoint = currentPoint;
              this.match.awayScore++;
              this.startNewLegIfpossible();
            } else if (currenPoint > 0) {
              const currentPoint = currenPoint - dart3;
              if (currentPoint === 0 && turn.throw3Multiplier === 2) {
                this.currentLeg.winner = this.match.awayId;
                this.currentLeg.awayPoint = currentPoint;
                this.match.awayScore++;
                this.startNewLegIfpossible();
              } else if (currentPoint > 0) {
                if (
                  possible3DartsCheckouts.includes(this.currentLeg.awayPoint) ||
                  possible2DartsCheckouts.includes(this.currentLeg.awayPoint) ||
                  possible1DartCheckout.includes(this.currentLeg.awayPoint)
                ) {
                }
                this.currentLeg.awayPoint = currentPoint;
              }
            }
          }
          currentPlayer = this.match.homeId;
        }
      } else {
        if (currentPlayer === this.match.homeId) {
          const currentPoint = this.currentLeg.homePoint - dart1;
          console.log("Első nyíl eldobva:", currentPoint);
          console.log("Meccs 1:", this.match);
          if (currentPoint === 0) {
            this.currentLeg.winner = this.match.homeId;
            this.currentLeg.homePoint = currentPoint;
            this.match.homeScore++;
            this.startNewLegIfpossible();
          } else if (currentPoint > 0) {
            const currenPoint = currentPoint - dart2;
            console.log("Második nyíl eldobva:", currenPoint);
            console.log("Meccs 2:", this.match);
            if (currenPoint === 0) {
              this.currentLeg.winner = this.match.homeId;
              this.currentLeg.homePoint = currentPoint;
              this.match.homeScore++;
              this.startNewLegIfpossible();
            } else if (currenPoint > 0) {
              const currentPoint = currenPoint - dart3;
              console.log("Harmadik nyíl eldobva:", currentPoint);
              console.log("Meccs 3:", this.match);
              if (currentPoint === 0) {
                this.currentLeg.winner = this.match.homeId;
                this.currentLeg.homePoint = currentPoint;
                this.match.homeScore++;
                this.startNewLegIfpossible();
              } else if (currentPoint > 0) {
                if (
                  possible3DartsCheckouts.includes(this.currentLeg.homePoint) ||
                  possible2DartsCheckouts.includes(this.currentLeg.homePoint) ||
                  possible1DartCheckout.includes(this.currentLeg.homePoint)
                ) {
                }
                this.currentLeg.homePoint = currentPoint;
                console.log(this.currentLeg.homePoint);
              }
            }
          }
          currentPlayer = this.match.awayId;
        } else {
          const currentPoint = this.currentLeg.awayPoint - dart1;
          if (currentPoint === 0) {
            this.currentLeg.winner = this.match.awayId;
            this.currentLeg.awayPoint = currentPoint;
            this.match.awayScore++;
            this.startNewLegIfpossible();
          } else if (currentPoint > 0) {
            const currenPoint = currentPoint - dart2;
            if (currenPoint === 0) {
              this.currentLeg.winner = this.match.awayId;
              this.currentLeg.awayPoint = currentPoint;
              this.match.awayScore++;
              this.startNewLegIfpossible();
            } else if (currenPoint > 0) {
              const currentPoint = currenPoint - dart3;
              if (currentPoint === 0) {
                this.currentLeg.winner = this.match.awayId;
                this.currentLeg.awayPoint = currentPoint;
                this.match.awayScore++;
                this.startNewLegIfpossible();
              } else if (currentPoint > 0) {
                if (
                  possible3DartsCheckouts.includes(this.currentLeg.awayPoint) ||
                  possible2DartsCheckouts.includes(this.currentLeg.awayPoint) ||
                  possible1DartCheckout.includes(this.currentLeg.awayPoint)
                ) {
                }
                this.currentLeg.awayPoint = currentPoint;
              }
            }
          }
          currentPlayer = this.match.homeId;
        }
      }
      console.log("Ez a match:", this.match);
      console.log("Leg:", this.currentLeg);
      this.match.legs = [this.currentLeg];
      return this.match;
    } else {
      undefined;
    }
  }
  startNewLegIfpossible() {
    if (this.match.homeScore === this.match.firstTo) {
      this.match.winner = this.match.homeId;
    } else if (this.match.awayScore === this.match.firstTo) {
      this.match.winner = this.match.awayId;
    } else {
      if (this.servicePlayer === this.match.homeId) {
        this.servicePlayer = this.match.awayId;
      } else {
        this.servicePlayer = this.match.homeId;
      }
      this.match.legs.push(this.currentLeg);
      console.log(this.currentLeg);
      this.currentLeg = new Leg(
        this.servicePlayer,
        "",
        this.match.points,
        this.match.points,
        []
      );
      this.match.legs.push(this.currentLeg);
      console.log(this.currentLeg);
    }
  }

  calculateStatistics(turn: Turn): Stat {
    const dart1 = turn.throw1Sector * turn.throw1Multiplier;
    const dart2 = turn.throw2Sector * turn.throw2Multiplier;
    const dart3 = turn.throw3Sector * turn.throw3Multiplier;
    const thrownPoint = dart1 + dart2 + dart3;
    if (turn.playerId === this.match.homeId) {
      this.homeTurnCount++;
      this.homeStat.average =
        (this.homeStat.average + thrownPoint) / this.homeTurnCount;

      if (
        possible3DartsCheckouts.includes(this.currentLeg.homePoint) ||
        possible2DartsCheckouts.includes(this.currentLeg.homePoint) ||
        possible1DartCheckout.includes(this.currentLeg.homePoint)
      ) {
        this.homePossibleCheckoutCount++;
        if (this.currentLeg.homePoint === thrownPoint) {
          this.homeStat.checkouts =
            this.homeCheckoutCount / this.homePossibleCheckoutCount;
          if (thrownPoint > this.homeStat.highestCheckout) {
            this.homeStat.highestCheckout = thrownPoint;
          }
          if (possible3DartsCheckouts.includes(thrownPoint)) {
            this.homeStat.numberOf3DartCheckouts++;
          } else if (possible2DartsCheckouts.includes(thrownPoint)) {
            this.homeStat.numberOf2DartCheckouts++;
          } else if (possible1DartCheckout.includes(thrownPoint)) {
            this.homeStat.numberOf1DartCheckouts++;
          }
        }
      }
      if (thrownPoint === 180) {
        this.homeStat.numberOf180s++;
      }
      if (thrownPoint >= 140 && thrownPoint < 180) {
        this.homeStat.numberOf140plus++;
      }
      if (thrownPoint >= 100 && thrownPoint < 140) {
        this.homeStat.numberOf100plus++;
      }

      if (this.homeTurnCount < 4) {
        this.homeStat.first9DartsAverage =
          (this.homeStat.first9DartsAverage + thrownPoint) / this.homeTurnCount;
      }

      this.homeStat.firstDartAvergrage =
        (this.homeStat.firstDartAvergrage + dart1) / this.homeTurnCount;
      this.homeStat.secondDartAverage =
        (this.homeStat.secondDartAverage + dart2) / this.homeTurnCount;
      this.homeStat.thirdDartAverage =
        (this.homeStat.thirdDartAverage + dart3) / this.homeTurnCount;

      if (dart1 === 60 || dart2 === 60 || dart3 === 60) {
        this.homeStat.triple20s++;
      }

      if (
        this.currentLeg.starterPlayer === this.match.awayId &&
        this.currentLeg.winner === this.match.homeId
      ) {
        this.homeStat.breaks++;
      }

      this.homeStat.percentageOf180PerLeg =
        this.homeStat.numberOf180s / this.homeTurnCount;
      return this.homeStat;
    } else {
      this.awayTurnCount++;
      this.awayStat.average =
        (this.awayStat.average + thrownPoint) / this.awayTurnCount;

      if (
        possible3DartsCheckouts.includes(this.currentLeg.awayPoint) ||
        possible2DartsCheckouts.includes(this.currentLeg.awayPoint) ||
        possible1DartCheckout.includes(this.currentLeg.awayPoint)
      ) {
        this.awayPossibleCheckoutCount++;
        if (this.currentLeg.awayPoint === thrownPoint) {
          this.awayStat.checkouts =
            this.awayCheckoutCount / this.awayPossibleCheckoutCount;
          if (thrownPoint > this.awayStat.highestCheckout) {
            this.awayStat.highestCheckout = thrownPoint;
          }
          if (possible3DartsCheckouts.includes(thrownPoint)) {
            this.awayStat.numberOf3DartCheckouts++;
          } else if (possible2DartsCheckouts.includes(thrownPoint)) {
            this.awayStat.numberOf2DartCheckouts++;
          } else if (possible1DartCheckout.includes(thrownPoint)) {
            this.awayStat.numberOf1DartCheckouts++;
          }
        }
      }
      if (thrownPoint === 180) {
        this.awayStat.numberOf180s++;
      }
      if (thrownPoint >= 140 && thrownPoint < 180) {
        this.awayStat.numberOf140plus++;
      }
      if (thrownPoint >= 100 && thrownPoint < 140) {
        this.awayStat.numberOf100plus++;
      }
      if (this.awayTurnCount < 4) {
        this.awayStat.first9DartsAverage =
          (this.awayStat.first9DartsAverage + thrownPoint) / this.awayTurnCount;
      }
      this.awayStat.firstDartAvergrage =
        (this.awayStat.firstDartAvergrage + dart1) / this.awayTurnCount;
      this.awayStat.secondDartAverage =
        (this.awayStat.secondDartAverage + dart2) / this.awayTurnCount;
      this.awayStat.thirdDartAverage =
        (this.awayStat.thirdDartAverage + dart3) / this.awayTurnCount;
      if (dart1 === 60 || dart2 === 60 || dart3 === 60) {
        this.awayStat.triple20s++;
      }
      if (
        this.currentLeg.starterPlayer === this.match.homeId &&
        this.currentLeg.winner === this.match.awayId
      ) {
        this.awayStat.breaks++;
      }
      this.awayStat.percentageOf180PerLeg =
        this.awayStat.numberOf180s / this.awayTurnCount;
      return this.awayStat;
    }
  }
}
