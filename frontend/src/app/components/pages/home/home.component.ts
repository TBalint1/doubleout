import { Component,OnInit } from '@angular/core';
import { RankingService } from 'src/app/services/ranking.service';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { Tournament } from 'src/app/shared/models/Tournament';
import { WorldRanking } from 'src/app/shared/models/WorldRanking';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ranking:WorldRanking[] = [];
  tournaments:Tournament[] = [];
  constructor(private rankingService:RankingService,private tournamentsService:TournamentsService){ 
    this.ranking = rankingService.getAll();
    this.tournaments = tournamentsService.getAll();
  }

  ngOnInit(): void {
  }

  public dateValue: Date = new Date(2024, 2, 27);

}
