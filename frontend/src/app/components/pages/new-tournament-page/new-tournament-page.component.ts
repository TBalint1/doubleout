import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { IMatchSettings, IPlayersData, ITournamentCreate } from 'src/app/shared/interfaces/ITournamentCreate';

@Component({
  selector: 'app-new-tournament-page',
  templateUrl: './new-tournament-page.component.html',
  styleUrls: ['./new-tournament-page.component.css']
})
export class NewTournamentPageComponent implements OnInit{
  newTournamentForm!:FormGroup
  isSubmitted = false;

  returnUrl = '';

  constructor(
    private formBuilder: FormBuilder,
    private tournamentsService: TournamentsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }
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
    const match: IMatchSettings = {
      points: fv.points,
      legs: fv.legs,
      doubleOut: fv.doubleOut
    }
    const player: IPlayersData = {
      name: fv.playerName
    }
    const tournament: ITournamentCreate = {
      name: fv.name,
      type: fv.type,
      playersCount: fv.playersCount,
      round: '',
      match: fv.match,
      players: fv.player,
      currentRound: '',
      winner: '',
      runnerUp: ''
    };
    this.tournamentsService.newTournament(tournament).subscribe(_ => {
      this.router.navigateByUrl(this.returnUrl)
    })
  }

}
