import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { Tournament } from 'src/app/shared/models/Tournament';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tournaments:Tournament[] = [];
  constructor(private tournamentsService: TournamentsService, activatedRoute: ActivatedRoute) {
    let tournamentsObservalbe:Observable<Tournament[]>;
    activatedRoute.params.subscribe((params) => {
        tournamentsObservalbe = tournamentsService.getAll();

        tournamentsObservalbe.subscribe((serverTournaments) => {
          this.tournaments = serverTournaments;
        })
    })

  }

  ngOnInit(): void {
  }

}
