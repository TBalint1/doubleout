import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { Leg, Match } from '../shared/models/Match';
import { START_MATCH_BY_ID } from '../shared/constants/urls';
import { DartsPartyResponse } from '../shared/models/DartsParty';

@Injectable({
  providedIn: 'root'
})
export class DartpartyService {

  currentOngoingMatchID : string|undefined;
  private matchSubject = new BehaviorSubject<DartsPartyResponse | undefined>(undefined);
  matchObservebale: Observable<DartsPartyResponse> = this.matchSubject.pipe(
    filter((value) => value !== undefined),
    map((value) => value as DartsPartyResponse)
  );
  
  constructor(private http: HttpClient) { 

  }



  startMatch(matchId: string) {
    const url = `${START_MATCH_BY_ID}/${matchId}`;
    this.currentOngoingMatchID = matchId;
    this.http.put<DartsPartyResponse>(url,null).subscribe(response => {
        this.matchSubject.next(response)
    });
  }


  throwLeg(newLeg : Leg){
    const url = `${START_MATCH_BY_ID}/${this.currentOngoingMatchID}/throw`;
    this.http.put<DartsPartyResponse>(url,newLeg).subscribe(response => {
        this.matchSubject.next(response)
    });
  }
}
