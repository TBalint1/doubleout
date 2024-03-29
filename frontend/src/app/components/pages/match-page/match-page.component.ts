import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllPlayersService } from 'src/app/services/all-players.service';
import { MatchesService } from 'src/app/services/matches.service';
import { Match } from 'src/app/shared/models/Match';
import { Player } from 'src/app/shared/models/Player';
import { Tournament } from 'src/app/shared/models/Tournament';

@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.css']
})
export class MatchPageComponent implements OnInit{

  match!: Match;
  tournament!: Tournament;
  player!: Player;

  constructor(private activatedRoute:ActivatedRoute, private matchesService:MatchesService, private playersService:AllPlayersService){

    this.activatedRoute.params.subscribe((params) => {
      if(params.id) {
        this.match = matchesService.getMatchByID(params.id);
        this.tournament = matchesService.getTournamentByID(params.id);
        this.playersService.getPlayerByID(params.id).subscribe(serverPlayer => {
          this.player = serverPlayer
        });
      }
    })

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
