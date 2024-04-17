import { Injectable } from '@angular/core';
import { Player } from '../shared/models/Player';
import { sample_matches, sample_players } from 'src/data';
import { Match } from '../shared/models/Match';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PLAYERS_URL, PLAYER_BY_ID_URL, PLAYER_BY_SEARCH_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class AllPlayersService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Player[]>{
    return this.http.get<Player[]>(PLAYERS_URL);
  }


  getAllMatch():Match[]{
    return sample_matches
  }

  getAllPlayersBySearchTerm(searchTerm:string){
    return this.http.get<Player[]>(PLAYER_BY_SEARCH_URL + searchTerm)
  }

  getPlayerByID(playerID:string):Observable<Player>{
    return this.http.get<Player>(PLAYER_BY_ID_URL + playerID);      
  }

  getMatchByPlayerID(playerID:string):Match{
    
  return this.getAllMatch().find( match => match.home_id == playerID || match.away_id == playerID) ?? new Match;
  }
  
}
