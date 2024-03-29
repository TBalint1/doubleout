import { Component, OnInit } from '@angular/core';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { Tournament } from 'src/app/shared/models/Tournament';

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.css']
})
export class TournamentsComponent implements OnInit {

  tournaments:Tournament[] = [];

  constructor(private tournamentsService:TournamentsService) {
    this.tournaments = tournamentsService.getAll();
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
