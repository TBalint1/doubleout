import { Match } from "../newMatch.model";
import { Stat } from "../stat.model";

export class DartsPartyResponse{
    match : Match;
    statistics : Stat

    constructor(match : Match, stat : Stat){
        this.match = match;
        this.statistics = stat;
    }
}