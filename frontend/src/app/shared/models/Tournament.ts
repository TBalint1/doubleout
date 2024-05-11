import { PlayersData } from './PlayerData';

export class Tournament {
  id!: string;
  name!: string;
  type!: string;
  playersCount!: number;
  points!: number;
  legs!: number;
  doubleOut!: boolean;
  players!: PlayersData[];
  currentRound!: string;
  winner!: string;
  runnerUp!: string;
}
