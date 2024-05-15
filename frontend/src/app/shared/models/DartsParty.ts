import { Match } from './Match';
import { Stat } from './Stat';

export class DartsPartyResponse {
  match: Match;
  stat: Stat;

  constructor(match: Match, stat: Stat) {
    this.match = match;
    this.stat = stat;
  }
}
