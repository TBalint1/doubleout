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

  //players: Player[] = [];
  matches: Match[] = [];
  updatingPlayersCount = false;

  constructor(
    private fb: FormBuilder,
    private tournamentsService: TournamentsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // let playersObservable:Observable<Player[]>;
    // activatedRoute.params.subscribe((params) => {
    //     playersObservable = tournamentsService.getAllPlayers();
    //     playersObservable.subscribe((serverPlayers) => {
    //       this.player = serverPlayers;
    //     })
    // })
  }
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

    // this.updatingPlayersCount = false;

    // this.newTournamentForm
    //   .get('playersCount')
    //   ?.valueChanges.subscribe((count: number) => {
    //     if (!this.updatingPlayersCount) {
    //       this.updatingPlayersCount = true;
    //       this.updatePlayersCount(count ?? 0);
    //       this.updatingPlayersCount = false;
    //     }
    //   });
    // this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
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

  // changePlayersCount(count: number) {
  //   this.players = [];
  //   for (let i = 0; i < count; i++) {
  //     this.addPlayer();
  //   }
  //   console.log('changed');
  // }

  // get playersControl() {
  //   return this.newTournamentForm.get('players') as FormArray;
  // }

  // updatePlayersCount(count: number) {
  //   const playersArray = this.newTournamentForm.get('players') as FormArray;
  //   while (playersArray.length !== count) {
  //     if (playersArray.length < count) {
  //       playersArray.push(
  //         this.formBuilder.group({
  //           name: ['', Validators.required],
  //         })
  //       );
  //     } else {
  //       playersArray.removeAt(playersArray.length - 1);
  //     }
  //   }
  // }

  submit() {
    // console.log(this.players);
    // console.log('this is fc: ', this.newTournamentForm.controls);
    // console.log('in submit');
    // this.isSubmitted = true;
    // if (this.newTournamentForm.invalid) {
    //   console.log(this.newTournamentForm.value);
    //   return;
    // }
    // console.log('this is fv', this.newTournamentForm.value);
    // const fv = this.newTournamentForm.value;
    // console.log('this is fv', fv);
    // // const playerData: IPlayersData[] = []
    // // for(let i = 0; i < this.players.length; i++) {
    // //    playerData.push({
    // //      name: fv.players[i].name
    // //   })
    // // };
    // const playerData: IPlayersData[] = fv.players.map((player: any) => ({
    //   name: player.name,
    // }));
    // const tournament: ITournamentCreate = {
    //   name: fv.name,
    //   type: fv.type,
    //   playersCount: parseInt(fv.playersCount),
    //   round: '',
    //   match: matchSettings,
    //   players: playerData,
    //   currentRound: '',
    //   winner: '',
    //   runnerUp: '',
    // };

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
