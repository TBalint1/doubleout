import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatchesService } from 'src/app/services/matches.service';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { Match } from 'src/app/shared/models/Match';
import { Stat } from 'src/app/shared/models/Stat';
import { Tournament } from 'src/app/shared/models/Tournament';

@Component({
  selector: 'app-tournament-page',
  templateUrl: './tournament-page.component.html',
  styleUrls: ['./tournament-page.component.css'],
})
export class TournamentPageComponent implements OnInit {
  tournament!: Tournament;
  matches: Match[] = [];
  stats: Stat[] = [];
  average: number = 0;
  checkouts: number = 0;
  numberOf180s: number = 0;
  numberOf140plus: number = 0;
  numberOf100plus: number = 0;
  highestCheckout: number = 0;
  first9DartsAverage: number = 0;
  firstDartAverage: number = 0;
  secondDartAverage: number = 0;
  thirdDartAverage: number = 0;
  numberOf3DartCheckouts: number = 0;
  numberOf2DartCheckouts: number = 0;
  numberOf1DartCheckouts: number = 0;
  triple20s: number = 0;
  breaks: number = 0;
  percentageOf180PerLeg: number = 0;
  constructor(
    private activatedRoute: ActivatedRoute,
    private tournamentsService: TournamentsService,
    private router: Router,
    private matchesService: MatchesService
  ) {
    let matchObservalbe: Observable<Match[]>;
    activatedRoute.params.subscribe((params) => {
      if (params.id)
        tournamentsService.getTournamentByID(params.id).subscribe((data) => {
          this.tournament = data.tournament;
          this.matches = data.matches;
          this.stats = data.stats;
          for (let i = 0; i < this.stats.length; i++) {
            this.average =
              (this.average + this.stats[i].average) / this.stats.length;
            this.checkouts =
              ((this.checkouts + this.stats[i].checkouts) / this.stats.length) *
              100;
            this.numberOf180s = this.numberOf180s + this.stats[i].numberOf180s;
            this.numberOf140plus =
              this.numberOf140plus + this.stats[i].numberOf140plus;
            this.numberOf100plus =
              this.numberOf100plus + this.stats[i].numberOf100plus;
            if (this.stats[i].highestCheckout > this.highestCheckout) {
              this.highestCheckout = this.stats[i].highestCheckout;
            }
            this.first9DartsAverage =
              (this.first9DartsAverage + this.stats[i].first9DartsAverage) /
              this.stats.length;
            this.firstDartAverage =
              (this.firstDartAverage + this.stats[i].firstDartAvergrage) /
              this.stats.length;
            this.secondDartAverage =
              (this.secondDartAverage + this.stats[i].secondDartAverage) /
              this.stats.length;
            this.thirdDartAverage =
              (this.thirdDartAverage + this.stats[i].thirdDartAverage) /
              this.stats.length;
            this.numberOf3DartCheckouts =
              this.numberOf3DartCheckouts +
              this.stats[i].numberOf3DartCheckouts;
            this.numberOf2DartCheckouts =
              this.numberOf2DartCheckouts +
              this.stats[i].numberOf2DartCheckouts;
            this.numberOf1DartCheckouts =
              this.numberOf1DartCheckouts +
              this.stats[i].numberOf1DartCheckouts;
            this.triple20s = this.triple20s + this.stats[i].triple20s;
            this.breaks = this.breaks + this.stats[i].breaks;
            this.percentageOf180PerLeg =
              this.percentageOf180PerLeg + this.stats[i].percentageOf180PerLeg;
          }
        });
    });
  }

  ngOnInit(): void {}
  startMatch(matchId: string) {
    this.matchesService
      .startMatch(matchId)
      .subscribe((data) => console.log(data));
  }
}
