import { Injectable } from '@angular/core';
import { Match } from '../shared/models/Match';
import { sample_matches, sample_tournaments } from 'src/data';
import { Tournament } from '../shared/models/Tournament';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  constructor() { }

  getAll():Match[]{
    return sample_matches;
  }

  getAllTournaments():Tournament[]{
    return sample_tournaments;
  }


  getMatchByID(matchID:string):Match{
    return this.getAll().find( match => match.id == matchID) ?? new Match;
  }

  getTournamentByID(tournamentID:string):Tournament{
    return this.getAllTournaments().find( tournament => tournament.id == tournamentID) ?? new Tournament;
  }
}
