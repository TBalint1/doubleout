import { Injectable } from '@angular/core';
import { Tournament } from '../shared/models/Tournament';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TOURNAMENTS_URL, MATCH_URL, PLAYER_BY_ID_URL, PLAYER_BY_SEARCH_URL, NEW_TOURNAMENT_URL } from '../shared/constants/urls';
import { Match } from '../shared/models/Match';
import { Player } from '../shared/models/Player';
import { ITournamentCreate } from '../shared/interfaces/ITournamentCreate'
import { ToastrService } from 'ngx-toastr';

const TOURNAMENT_KEY = 'Tournament'
@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  private tournamentSubject = new BehaviorSubject<Tournament>(this.getTournamentFromLocaleStorage());
  private tournamentObservable:Observable<Tournament>;

  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.tournamentObservable=this.tournamentSubject.asObservable();
   }

  getAll(): Observable<Tournament[]>{
    return this.http.get<Tournament[]>(TOURNAMENTS_URL);
  }

  getAllMatch(): Observable<Match[]>{
    return this.http.get<Match[]>(MATCH_URL);
  }

  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(PLAYER_BY_ID_URL)
  }

  newTournament(tournamentCreate: ITournamentCreate): Observable<Tournament> {
    return this.http.post<Tournament>(NEW_TOURNAMENT_URL, tournamentCreate).pipe(tap({
      next: (tournament) => {
        this.setTournamentToLocalStorage(tournament);
        this.tournamentSubject.next(tournament);
        this.toastrService.success(
          'Tournament created succesfully!'
        )
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error, 'Login Failed');
      }
    }))
  }

  private setTournamentToLocalStorage(tournament:Tournament) {
    localStorage.setItem(TOURNAMENT_KEY, JSON.stringify(tournament))
  }

  private getTournamentFromLocaleStorage():Tournament{
    const tournamentJson = localStorage.getItem(TOURNAMENT_KEY);
    if(tournamentJson) return JSON.parse(tournamentJson) as Tournament;
    return new Tournament();
  }
  
}
