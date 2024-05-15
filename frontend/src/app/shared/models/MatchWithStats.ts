import { Match } from './Match';
import { Stat } from './Stat';

export class MatchWithStats {
  match: Match;
  homeStat: Stat;
  awayStat: Stat;

  constructor(match: Match, homeStat: Stat, awayStat: Stat) {
    this.match = match;
    this.homeStat = homeStat;
    this.awayStat = awayStat;
  }
}
