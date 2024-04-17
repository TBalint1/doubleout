import { Injectable } from '@angular/core';
import { Tournament } from '../shared/models/Tournament';
import { sample_tournaments } from 'src/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TOURNAMENTS_URL, MATCH_URL, PLAYER_BY_ID_URL, PLAYER_BY_SEARCH_URL } from '../shared/constants/urls';
import { Match } from '../shared/models/Match';
import { Player } from '../shared/models/Player';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Tournament[]>{
    return this.http.get<Tournament[]>(TOURNAMENTS_URL);
  }

  getAllMatch(): Observable<Match[]>{
    return this.http.get<Match[]>(MATCH_URL);
  }

  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(PLAYER_BY_ID_URL)
  }
  
}
