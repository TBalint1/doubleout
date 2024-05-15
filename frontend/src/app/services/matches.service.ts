import { Injectable } from '@angular/core';
import { Match } from '../shared/models/Match';
import { HttpClient, HttpParams } from '@angular/common/http';
import { sample_matches, sample_tournaments } from 'src/data';
import { Tournament } from '../shared/models/Tournament';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  TOURNAMENTS_URL,
  MATCH_URL,
  PLAYER_BY_ID_URL,
  NEW_TOURNAMENT_URL,
  TOURNAMENT_BY_ID_URL,
  PLAYERS_URL,
} from '../shared/constants/urls';
import { Stat } from '../shared/models/Stat';
import { IPlayMatch } from '../shared/interfaces/IPlayMatch';
import { DartsPartyResponse } from '../shared/models/DartsParty';
import { MatchWithStats } from '../shared/models/MatchWithStats';

const MATCH_KEY = 'Match';
@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  private matchSubject = new BehaviorSubject<Match>(
    this.getMatchFromLocaleStorage()
  );
  private matchObservable: Observable<Match>;
  constructor(private http: HttpClient) {
    this.matchObservable = this.matchSubject.asObservable();
  }

  getAll(): Observable<Match[]> {
    return this.http.get<Match[]>(MATCH_URL);
  }

  getAllTournaments(): Tournament[] {
    return sample_tournaments;
  }

  getMatchByID(matchID: string): Observable<MatchWithStats> {
    return this.http.get<MatchWithStats>(MATCH_URL + matchID);
  }

  countinueMatch(matchID: string): Observable<MatchWithStats> {
    return this.http.get<MatchWithStats>(MATCH_URL + matchID + '/onGoing');
  }

  getAllMatchByTournamentID(tournamentID: string): Observable<Match[]> {
    // Paraméterek összeállítása
    const params = new HttpParams().set('tournamentID', tournamentID);

    // GET kérés elküldése a megadott paraméterekkel
    return this.http.get<Match[]>(MATCH_URL, { params });
  }

  startMatch(matchID: string): Observable<DartsPartyResponse> {
    return this.http
      .put<DartsPartyResponse>(MATCH_URL + matchID + '/onGoing', {})
      .pipe(
        tap({
          next: (dartsPartyResponse) => {
            this.setMatchToLocaleStorage(dartsPartyResponse.match);
            this.matchSubject.next(dartsPartyResponse.match);
          },
        })
      );
  }

  dartsParty(
    playMatch: IPlayMatch,
    matchID: string
  ): Observable<DartsPartyResponse> {
    return this.http
      .put<DartsPartyResponse>(
        MATCH_URL + matchID + '/onGoing/throw',
        playMatch
      )
      .pipe(
        tap({
          next: (dartsPartyResponse) => {
            this.setMatchToLocaleStorage(dartsPartyResponse.match);
            this.matchSubject.next(dartsPartyResponse.match);
          },
        })
      );
  }

  private setMatchToLocaleStorage(matches: Match) {
    localStorage.setItem(MATCH_KEY, JSON.stringify(matches));
  }

  private getMatchFromLocaleStorage(): Match {
    const match = JSON.parse(localStorage.getItem(MATCH_KEY)!);
    return match;
  }
}
