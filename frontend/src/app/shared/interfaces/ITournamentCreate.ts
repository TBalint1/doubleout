export interface ITournamentCreate {
  name: string;
  type: string;
  playersCount: number;
  points: number;
  legs: number;
  doubleOut: boolean;
  players: IPlayersData[];
  currentRound: string;
  winner: string;
  runnerUp: string;
}

export interface IPlayersData {
  playerName: string;
}
