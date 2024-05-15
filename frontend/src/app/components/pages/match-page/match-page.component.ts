import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllPlayersService } from 'src/app/services/all-players.service';
import { MatchesService } from 'src/app/services/matches.service';
import { Leg, Match } from 'src/app/shared/models/Match';
import { Player } from 'src/app/shared/models/Player';
import { Stat } from 'src/app/shared/models/Stat';
import { Tournament } from 'src/app/shared/models/Tournament';
import { IPlayMatch } from 'src/app/shared/interfaces/IPlayMatch';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.css'],
})
export class MatchPageComponent implements OnInit {
  match!: Match;
  tournament!: Tournament;
  player!: Player;
  homeStat!: Stat;
  awayStat!: Stat;
  constructor(
    private activatedRoute: ActivatedRoute,
    private matchesService: MatchesService
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id) {
        matchesService.getMatchByID(params.id).subscribe((data) => {
          this.match = data.match;
          this.homeStat = data.homeStat;
          this.awayStat = data.awayStat;
          console.log(this.match);
          console.log(this.homeStat);
          console.log(data);
          console.log(this.awayStat);
        });
      }
    });
  }
  ngOnInit(): void {}

  startMatch(matchId: string) {
    this.matchesService
      .startMatch(matchId)
      .subscribe((data) => console.log(data));
  }

  countinueMatch(matchId: string) {
    this.matchesService
      .countinueMatch(matchId)
      .subscribe((data) => console.log(data));
  }
}
