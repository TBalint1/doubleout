import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllPlayersService } from 'src/app/services/all-players.service';
import { MatchesService } from 'src/app/services/matches.service';
import { Match } from 'src/app/shared/models/Match';
import { Player } from 'src/app/shared/models/Player';
import { Stat } from 'src/app/shared/models/Stat';
import { Tournament } from 'src/app/shared/models/Tournament';
import { IPlayMatch } from 'src/app/shared/interfaces/IPlayMatch';

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.css'],
})
export class MatchPageComponent implements OnInit {
  match!: Match;
  tournament!: Tournament;
  player!: Player;
  stats: Stat[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private matchesService: MatchesService,
    private playersService: AllPlayersService
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id) {
        matchesService.getMatchByID(params.id).subscribe((data) => {
          this.match = data.match;
          this.stats = data.stats;
        });
      }
    });
  }
  ngOnInit(): void {}
}
