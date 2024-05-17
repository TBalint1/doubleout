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
  homeSumPoint: number;
  awaySumPoint: number;
  homeDart1Sum: number;
  homeDart2Sum: number;
  homeDart3Sum: number;
  awayDart1Sum: number;
  awayDart2Sum: number;
  awayDart3Sum: number;
  previousHomePoint: number;
  previousAwayPoint: number;
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
    this.homeSumPoint = 0;
    this.awaySumPoint = 0;
    this.homeDart1Sum = 0;
    this.homeDart2Sum = 0;
    this.homeDart3Sum = 0;
    this.awayDart1Sum = 0;
    this.awayDart2Sum = 0;
    this.awayDart3Sum = 0;
    this.previousHomePoint = 0;
    this.previousAwayPoint = 0;
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
    const previousTurn =
      this.currentLeg.turns?.[this.currentLeg.turns.length - 1]?.playerId;
    if (previousTurn === undefined || previousTurn !== turn.playerId) {
      let currentPlayer = turn.playerId;
      this.currentLeg.turns.push(turn);
      if (this.match.doubleOut === true) {
        if (currentPlayer === this.match.homeId) {
          this.previousHomePoint = this.currentLeg.homePoint;
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
                this.currentLeg.homePoint = currentPoint;
              }
            }
          }
          currentPlayer = this.match.awayId;
        } else {
          this.previousAwayPoint = this.currentLeg.awayPoint;
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
                this.currentLeg.awayPoint = currentPoint;
              }
            }
          }
          currentPlayer = this.match.homeId;
        }
      } else {
        if (currentPlayer === this.match.homeId) {
          this.previousHomePoint = this.currentLeg.homePoint;
          const currentPoint = this.currentLeg.homePoint - dart1;
          if (currentPoint === 0) {
            this.currentLeg.winner = this.match.homeId;
            this.currentLeg.homePoint = currentPoint;
            this.match.homeScore++;
            this.startNewLegIfpossible();
          } else if (currentPoint > 0) {
            const currenPoint = currentPoint - dart2;
            if (currenPoint === 0) {
              this.currentLeg.winner = this.match.homeId;
              this.currentLeg.homePoint = currentPoint;
              this.match.homeScore++;
              this.startNewLegIfpossible();
            } else if (currenPoint > 0) {
              const currentPoint = currenPoint - dart3;
              if (currentPoint === 0) {
                this.currentLeg.winner = this.match.homeId;
                this.currentLeg.homePoint = currentPoint;
                this.match.homeScore++;
                this.startNewLegIfpossible();
              } else if (currentPoint > 0) {
                this.currentLeg.homePoint = currentPoint;
              }
            }
          }
          currentPlayer = this.match.awayId;
        } else {
          this.previousAwayPoint = this.currentLeg.awayPoint;
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
                this.currentLeg.awayPoint = currentPoint;
              }
            }
          }
          currentPlayer = this.match.homeId;
        }
      }
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
      this.currentLeg = new Leg(
        this.servicePlayer,
        "",
        this.match.points,
        this.match.points,
        []
      );
      this.match.legs.push(this.currentLeg);
    }
  }

  calculateStatistics(turn: Turn): Stat {
    const dart1 = turn.throw1Sector * turn.throw1Multiplier;
    const dart2 = turn.throw2Sector * turn.throw2Multiplier;
    const dart3 = turn.throw3Sector * turn.throw3Multiplier;
    const thrownPoint = dart1 + dart2 + dart3;
    if (turn.playerId === this.match.homeId) {
      this.homeTurnCount++;
      this.homeSumPoint += thrownPoint;
      this.homeDart1Sum += dart1;
      this.homeDart2Sum += dart2;
      this.homeDart3Sum += dart3;
      console.log(
        "HomeTurn:",
        this.homeTurnCount,
        "HomeSumPoint:",
        this.homeSumPoint
      );
      this.homeStat.average = this.homeSumPoint / this.homeTurnCount;
      console.log(
        "CurrentHomePoint:",
        this.currentLeg.homePoint,
        "thrownPoint:",
        thrownPoint,
        "PreviousHomePoint:",
        this.previousHomePoint
      );
      if (
        possible3DartsCheckouts.includes(this.previousHomePoint) ||
        possible2DartsCheckouts.includes(this.previousHomePoint) ||
        possible1DartCheckout.includes(this.previousHomePoint)
      ) {
        this.homePossibleCheckoutCount++;
        console.log(
          "HomePossibleCheckoutCount:",
          this.homePossibleCheckoutCount
        );
        if (this.previousHomePoint === thrownPoint) {
          this.homeCheckoutCount++;
          console.log("HomeCheckoutCount:", this.homeCheckoutCount);
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
          this.homeSumPoint / this.homeTurnCount;
      }

      this.homeStat.firstDartAvergrage = this.homeDart1Sum / this.homeTurnCount;
      this.homeStat.secondDartAverage = this.homeDart2Sum / this.homeTurnCount;
      this.homeStat.thirdDartAverage = this.homeDart3Sum / this.homeTurnCount;

      if (dart1 === 60) {
        this.homeStat.triple20s++;
      }

      if (dart2 === 60) {
        this.homeStat.triple20s++;
      }

      if (dart3 === 60) {
        this.homeStat.triple20s++;
      }

      this.homeStat.percentageOf180PerLeg =
        this.homeStat.numberOf180s / this.homeTurnCount;
      return this.homeStat;
    } else {
      this.awayTurnCount++;
      this.awaySumPoint += thrownPoint;
      this.awayDart1Sum += dart1;
      this.awayDart2Sum += dart2;
      this.awayDart3Sum += dart3;
      console.log(
        "AwayTurn:",
        this.awayTurnCount,
        "AwaySumPoint:",
        this.awaySumPoint
      );
      this.awayStat.average = this.awaySumPoint / this.awayTurnCount;
      console.log(
        "CurrentAwayPoint:",
        this.currentLeg.awayPoint,
        "thrownPoint:",
        thrownPoint,
        "PreviousAwayPoint:",
        this.previousAwayPoint
      );
      if (
        possible3DartsCheckouts.includes(this.previousAwayPoint) ||
        possible2DartsCheckouts.includes(this.previousAwayPoint) ||
        possible1DartCheckout.includes(this.previousAwayPoint)
      ) {
        this.awayPossibleCheckoutCount++;
        console.log(
          "AwayPossibleCheckoutCount:",
          this.awayPossibleCheckoutCount
        );
        if (this.previousAwayPoint === thrownPoint) {
          this.awayCheckoutCount++;
          console.log("AwayCheckoutCount:", this.awayCheckoutCount);
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
          this.awaySumPoint / this.awayTurnCount;
      }
      this.awayStat.firstDartAvergrage = this.awayDart1Sum / this.awayTurnCount;
      this.awayStat.secondDartAverage = this.awayDart2Sum / this.awayTurnCount;
      this.awayStat.thirdDartAverage = this.awayDart3Sum / this.awayTurnCount;
      if (dart1 === 60) {
        this.awayStat.triple20s++;
      }
      if (dart2 === 60) {
        this.awayStat.triple20s++;
      }
      if (dart3 === 60) {
        this.awayStat.triple20s++;
      }
      this.awayStat.percentageOf180PerLeg =
        this.awayStat.numberOf180s / this.awayTurnCount;
      return this.awayStat;
    }
  }
}
