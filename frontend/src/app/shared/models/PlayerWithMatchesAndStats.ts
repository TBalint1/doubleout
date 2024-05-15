import { Player } from './Player';
import { Match } from './Match';
import { Stat } from './Stat';

export class PlayerWithMatchesAndStats {
  player: Player;
  matches: Match[] = [];
  stats: Stat[] = [];
  constructor(player: Player, matches: Match[], stats: Stat[]) {
    this.player = player;
    this.matches = matches;
    this.stats = stats;
  }
}
