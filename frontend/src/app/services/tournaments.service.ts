import { Injectable } from '@angular/core';
import { Tournament } from '../shared/models/Tournament';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  TOURNAMENTS_URL,
  MATCH_URL,
  PLAYER_BY_ID_URL,
  NEW_TOURNAMENT_URL,
  TOURNAMENT_BY_ID_URL,
  PLAYERS_URL,
  TOURNAMENT_BY_SEARCH_URL,
} from '../shared/constants/urls';
import { Match } from '../shared/models/Match';
import { Player } from '../shared/models/Player';
import { ITournamentCreate } from '../shared/interfaces/ITournamentCreate';
import { ToastrService } from 'ngx-toastr';
import { TournamentWithMatches } from '../shared/models/TournamentWithMatches';

const TOURNAMENT_KEY = 'Tournament';
@Injectable({
  providedIn: 'root',
})
export class TournamentsService {
  private tournamentSubject = new BehaviorSubject<Tournament>(
    this.getTournamentFromLocaleStorage()
  );
  private tournamentObservable: Observable<Tournament>;

  constructor(private http: HttpClient, private toastrService: ToastrService) {
    this.tournamentObservable = this.tournamentSubject.asObservable();
  }

  getAll(): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(TOURNAMENTS_URL);
  }

  getTournamentByID(tournamentID: string): Observable<TournamentWithMatches> {
    return this.http.get<TournamentWithMatches>(
      TOURNAMENT_BY_ID_URL + tournamentID
    );
  }

  getAllTournamentsBySearchTerm(searchTerm: string) {
    return this.http.get<Tournament[]>(TOURNAMENT_BY_SEARCH_URL + searchTerm);
  }

  getAllMatch(): Observable<Match[]> {
    return this.http.get<Match[]>(MATCH_URL);
  }

  getMatchByID(matchID: string): Observable<Match> {
    return this.http.get<Match>(MATCH_URL + matchID);
  }

  getAllMatchByTournamentID(tournamentID: string): Observable<Match[]> {
    return this.http.get<Match[]>(MATCH_URL + '?tournamentID=' + tournamentID);
  }

  getMatchByTournamentID(
    tournamentID: string,
    matchID: string
  ): Observable<Match[]> {
    return this.http.get<Match[]>(
      MATCH_URL + '?tournamentID=' + tournamentID + matchID
    );
  }

  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(PLAYERS_URL);
  }

  newTournament(tournamentCreate: ITournamentCreate): Observable<Tournament> {
    return this.http
      .post<Tournament>(NEW_TOURNAMENT_URL, tournamentCreate)
      .pipe(
        tap({
          next: (tournament) => {
            this.setTournamentToLocalStorage(tournament);
            this.tournamentSubject.next(tournament);
            this.toastrService.success('Tournament created succesfully!');
          },
          error: (errorResponse) => {
            this.toastrService.error(errorResponse.error, 'Tournament Failed');
          },
        })
      );
  }

  private setTournamentToLocalStorage(tournament: Tournament) {
    localStorage.setItem(TOURNAMENT_KEY, JSON.stringify(tournament));
  }

  private getTournamentFromLocaleStorage(): Tournament {
    const tournamentJson = localStorage.getItem(TOURNAMENT_KEY);
    if (tournamentJson) return JSON.parse(tournamentJson) as Tournament;
    return new Tournament();
  }
}
