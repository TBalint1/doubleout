import { Tournament } from './Tournament';
import { Match } from './Match';
import { Stat } from './Stat';

export class TournamentWithMatches {
  tournament: Tournament;
  matches: Match[] = [];
  stats: Stat[] = [];

  constructor(tournament: Tournament, matches: Match[], stats: Stat[]) {
    this.tournament = tournament;
    this.matches = matches;
    this.stats = stats;
  }
}
