import { Injectable } from '@angular/core';
import { Player } from '../shared/models/Player';
import { sample_matches, sample_players } from 'src/data';
import { Match } from '../shared/models/Match';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PLAYERS_URL,
  PLAYER_BY_ID_URL,
  PLAYER_BY_SEARCH_URL,
  MATCH_URL,
} from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class AllPlayersService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Player[]> {
    return this.http.get<Player[]>(PLAYERS_URL);
  }

  getAllMatch(): Observable<Match[]> {
    return this.http.get<Match[]>(MATCH_URL);
  }

  getAllPlayersBySearchTerm(searchTerm: string) {
    return this.http.get<Player[]>(PLAYER_BY_SEARCH_URL + searchTerm);
  }

  getPlayerByID(playerID: string): Observable<Player> {
    return this.http.get<Player>(PLAYER_BY_ID_URL + playerID);
  }

  getAllMatchByPlayerID(playerID: string): Observable<Match[]> {
    return this.http.get<Match[]>(
      MATCH_URL + '?homeId=' + playerID + '&awayId=' + playerID
    );
  }

  getAllStatsByPlayerID(playerID: string): Observable<Player> {
    return this.http.get<Player>(PLAYER_BY_ID_URL + playerID);
  }

  // getMatchByPlayerID(playerID:string):Match{

  // return this.getAllMatch().find( match => match.homeId == playerID || match.awayId == playerID) ?? new Match;

  // }
}
