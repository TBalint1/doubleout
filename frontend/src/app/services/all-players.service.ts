import { Injectable } from '@angular/core';
import { Player } from '../shared/models/Player';
import { sample_WorldRanking, sample_matches, sample_players } from 'src/data';
import { WorldRanking } from '../shared/models/WorldRanking';
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

  getAllRanking():WorldRanking[]{
    return sample_WorldRanking
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

  getRankingByID(playerID:string):WorldRanking{
    return this.getAllRanking().find( ranking => ranking.id == playerID) ?? new WorldRanking;
  }

  getMatchByPlayerID(playerID:string):Match{
    
  return this.getAllMatch().find( match => match.HOME_ID == playerID || match.AWAY_ID == playerID) ?? new Match;
  }
  
}
