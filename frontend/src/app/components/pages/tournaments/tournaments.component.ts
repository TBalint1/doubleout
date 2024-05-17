import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { Tournament } from 'src/app/shared/models/Tournament';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css'],
})
export class TournamentsComponent implements OnInit {
  tournaments: Tournament[] = [];
  constructor(
    private tournamentsService: TournamentsService,
    activatedRoute: ActivatedRoute
  ) {
    let tournamentsObservalbe: Observable<Tournament[]>;
    activatedRoute.params.subscribe((params) => {
      tournamentsObservalbe = tournamentsService.getAll();

      tournamentsObservalbe.subscribe((serverTournaments) => {
        this.tournaments = serverTournaments;
      });
    });
  }

  ngOnInit(): void {}
}
