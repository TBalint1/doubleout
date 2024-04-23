import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { IMatchSettings, IPlayersData, ITournamentCreate } from 'src/app/shared/interfaces/ITournamentCreate';
import { Player } from 'src/app/shared/models/Player';

@Component({
  selector: 'app-new-tournament-page',
  templateUrl: './new-tournament-page.component.html',
  styleUrls: ['./new-tournament-page.component.css']
})
export class NewTournamentPageComponent implements OnInit{
  newTournamentForm!:FormGroup
  isSubmitted = false;

  returnUrl = '';

  player: Player[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private tournamentsService: TournamentsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    let playersObservable:Observable<Player[]>;
    activatedRoute.params.subscribe((params) => {
        playersObservable = tournamentsService.getAllPlayers();
        playersObservable.subscribe((serverPlayers) => {
          this.player = serverPlayers;
        })
    })
  }
  ngOnInit(): void {
    this.newTournamentForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.minLength(5)]],
      type: ['',[Validators.required]],
      playersCount: ['',[Validators.required]],
      points: ['',[Validators.required]],
      legs: ['',[Validators.required]],
      doubleOut: ['',[Validators.required]],
      playerName: ['',Validators.required],
      });
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.newTournamentForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if(this.newTournamentForm.invalid) return;

    const fv = this.newTournamentForm.value;
    const tournament: ITournamentCreate = {
      name: fv.name,
      type: fv.type,
      playersCount: fv.playersCount,
      round: '',
      match: [{
        points: fv.points,
        legs: fv.legs,
        doubleOut: fv.doubleOut
      }],
      players: [{
        name: fv.playerName
      }],
      currentRound: '',
      winner: '',
      runnerUp: ''
    };
    this.tournamentsService.newTournament(tournament).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl)
    })
  }

}