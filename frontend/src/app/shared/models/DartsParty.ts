import { Match } from "./Match";
import { Stat } from "./Stat";

export class DartsPartyResponse{
    match : Match;
    statistics : Stat

    constructor(match : Match, stat : Stat){
        this.match = match;
        this.statistics = stat;
    }
}