import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { Match } from 'src/app/shared/models/Match';
import { Tournament } from 'src/app/shared/models/Tournament';

@Component({
  selector: 'app-tournament-page',
  templateUrl: './tournament-page.component.html',
  styleUrls: ['./tournament-page.component.css'],
})
export class TournamentPageComponent implements OnInit {
  tournament!: Tournament;
  matches: Match[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private tournamentsService: TournamentsService,
    private router: Router
  ) {
    let matchObservalbe: Observable<Match[]>;
    activatedRoute.params.subscribe((params) => {
      if (params.id)
        tournamentsService.getTournamentByID(params.id).subscribe((data) => {
          this.tournament = data.tournament;
          this.matches = data.matches;
        });
    });
  }

  ngOnInit(): void {}
}
