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
} from '../shared/constants/urls';
import { PlayerWithMatchesAndStats } from '../shared/models/PlayerWithMatchesAndStats';

@Injectable({
  providedIn: 'root',
})
export class AllPlayersService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Player[]> {
    return this.http.get<Player[]>(PLAYERS_URL);
  }

  getAllPlayersBySearchTerm(searchTerm: string) {
    return this.http.get<Player[]>(PLAYER_BY_SEARCH_URL + searchTerm);
  }

  getPlayerByID(playerID: string): Observable<PlayerWithMatchesAndStats> {
    return this.http.get<PlayerWithMatchesAndStats>(
      PLAYER_BY_ID_URL + playerID
    );
  }
}
