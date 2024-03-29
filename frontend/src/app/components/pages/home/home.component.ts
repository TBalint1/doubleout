import { Component,OnInit } from '@angular/core';
import { MatchesService } from 'src/app/services/matches.service';
import { RankingService } from 'src/app/services/ranking.service';
import { Match } from 'src/app/shared/models/Match';
import { WorldRanking } from 'src/app/shared/models/WorldRanking';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ranking:WorldRanking[] = [];
  matches:Match[] = [];
  constructor(private rankingService:RankingService,private matchesService:MatchesService){ 
    this.ranking = rankingService.getAll();
    this.matches = matchesService.getAll();
  }

  ngOnInit(): void {
  }

  public dateValue: Date = new Date(2024, 2, 27);

}
