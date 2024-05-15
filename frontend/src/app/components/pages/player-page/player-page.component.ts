import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AllPlayersService } from 'src/app/services/all-players.service';
import { Match } from 'src/app/shared/models/Match';
import { Player } from 'src/app/shared/models/Player';
import { Stat } from 'src/app/shared/models/Stat';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.css'],
})
export class PlayerPageComponent implements OnInit {
  player!: Player;
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
    private allPlayersService: AllPlayersService,
    private router: Router
  ) {
    let playerObservable: Observable<Player>;
    activatedRoute.params.subscribe((params) => {
      if (params.id) {
        allPlayersService.getPlayerByID(params.id).subscribe((data) => {
          this.player = data.player;
          this.matches = data.matches;
          this.stats = data.stats;
          console.log(data);
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
      }
    });

    console.log(this.stats);
  }

  ngOnInit(): void {
    console.log(this.stats);
  }
}
