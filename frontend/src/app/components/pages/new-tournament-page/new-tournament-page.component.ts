import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TournamentsService } from 'src/app/services/tournaments.service';
import {
  IPlayersData,
  ITournamentCreate,
} from 'src/app/shared/interfaces/ITournamentCreate';
import { Match } from 'src/app/shared/models/Match';
import { Player } from 'src/app/shared/models/Player';

@Component({
  selector: 'app-new-tournament-page',
  templateUrl: './new-tournament-page.component.html',
  styleUrls: ['./new-tournament-page.component.css'],
})
export class NewTournamentPageComponent implements OnInit {
  newTournamentForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';
  matches: Match[] = [];
  updatingPlayersCount = false;

  constructor(
    private fb: FormBuilder,
    private tournamentsService: TournamentsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.newTournamentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', [Validators.required]],
      playersCount: ['', [Validators.required]],
      points: ['', [Validators.required]],
      legs: ['', [Validators.required]],
      doubleOut: ['', [Validators.required]],
      players: this.fb.array([]),
    });
  }

  get players() {
    return this.newTournamentForm.get('players') as FormArray;
  }

  get fc() {
    return this.newTournamentForm.controls;
  }

  addPlayer() {
    const player = this.fb.group({
      playerName: ['', Validators.required],
    });
    this.players.push(player);
  }

  addPlayers(count: number) {
    for (let i = 0; i < count; i++) {
      this.addPlayer();
    }
  }

  submit() {
    const tournament: ITournamentCreate = {
      name: this.newTournamentForm.value.name,
      type: this.newTournamentForm.value.type,
      playersCount: parseInt(this.newTournamentForm.value.playersCount),
      points: parseInt(this.newTournamentForm.value.points),
      legs: parseInt(this.newTournamentForm.value.legs),
      doubleOut: this.newTournamentForm.value.double_out == 'true',
      players: this.newTournamentForm.value.players,
      currentRound: 'Round 1',
      winner: '',
      runnerUp: '',
    };
    this.tournamentsService.newTournament(tournament).subscribe((_) => {
      this.router.navigateByUrl(this.returnUrl);
    });
  }
}
