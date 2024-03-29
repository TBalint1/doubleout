import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AllPlayersService } from 'src/app/services/all-players.service';
import { Player } from 'src/app/shared/models/Player';

@Component({
  selector: 'app-all-players',
  templateUrl: './all-players.component.html',
  styleUrls: ['./all-players.component.css']
})
export class AllPlayersComponent implements OnInit {

  players:Player[] = [];

  constructor(private allPlayersService: AllPlayersService, activatedRoute:ActivatedRoute) {
    let playersObservable:Observable<Player[]>
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
      playersObservable = this.allPlayersService.getAllPlayersBySearchTerm(params.searchTerm);
      else
      playersObservable = allPlayersService.getAll();

      playersObservable.subscribe((serverPlayers) => {
        this.players = serverPlayers;
      })
    })

   }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
