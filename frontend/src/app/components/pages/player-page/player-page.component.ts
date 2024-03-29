import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AllPlayersService } from 'src/app/services/all-players.service';
import { Match } from 'src/app/shared/models/Match';
import { Player } from 'src/app/shared/models/Player';
import { WorldRanking } from 'src/app/shared/models/WorldRanking';

@Component({
  selector: 'app-player-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.css']
})
export class PlayerPageComponent implements OnInit{
  player!: Player;
  ranking!: WorldRanking;
  match!:Match;
  constructor(private activatedRoute: ActivatedRoute, private allPlayersService:AllPlayersService, private router: Router) { 

    activatedRoute.params.subscribe((params) => {
      if(params.id)
      allPlayersService.getPlayerByID(params.id).subscribe(serverPlayer => {
        this.player = serverPlayer;
      });
    })
   }

  ngOnInit(): void {
    
  }

}
