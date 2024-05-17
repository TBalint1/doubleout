import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { last } from 'rxjs';
import { MatchesService } from 'src/app/services/matches.service';
import { IPlayMatch } from 'src/app/shared/interfaces/IPlayMatch';
import { Leg, Match } from 'src/app/shared/models/Match';
import { Stat } from 'src/app/shared/models/Stat';

@Component({
  selector: 'app-darts-party-page',
  templateUrl: './darts-party-page.component.html',
  styleUrls: ['./darts-party-page.component.css'],
})
export class DartsPartyPageComponent implements OnInit {
  match!: Match;
  homeStat!: Stat;
  awayStat!: Stat;
  previousLeg!: Leg;
  currentLeg!: Leg;
  newThorwForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';
  currentPlayer: string = '';
  currentPlayerName: string = '';
  homeThrows: number[] = [];
  awayThrows: number[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private matchesService: MatchesService,
    private fb: FormBuilder,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id) {
        matchesService.getMatchByID(params.id).subscribe((data) => {
          this.match = data.match;
          this.homeStat = data.homeStat;
          this.awayStat = data.awayStat;
          console.log(this.currentLeg);
          console.log(this.match);
          console.log('Home stat: ', this.homeStat);
          console.log('Away stat: ', this.awayStat);
          this.currentLeg = data.match.legs[0];
          // if (this.match.legs[0].turns !== null) {
          //   if (
          //     this.match.legs[0].turns[this.match.legs[0].turns.length - 1]
          //       .playerId === this.match.homeId
          //   ) {
          //     this.currentPlayer = this.match.awayId;
          //     this.currentPlayerName = this.match.awayName;
          //   } else {
          //     this.currentPlayer = this.match.homeId;
          //     this.currentPlayerName = this.match.homeName;
          //   }
          // } else {
          this.currentPlayer = this.currentLeg.starterPlayer;
          if (this.currentPlayer === this.match.homeId) {
            this.currentPlayerName = this.match.homeName;
          } else {
            this.currentPlayerName = this.match.awayName;
          }
        });
      }
    });
  }
  ngOnInit(): void {
    this.newThorwForm = this.fb.group({
      throw1Sector: [''],
      throw1Multiplier: [''],
      throw2Sector: [''],
      throw2Multiplier: [''],
      throw3Sector: [''],
      throw3Multiplier: [''],
    });

    console.log(this.match);
    console.log(this.currentLeg);
  }

  throw() {
    const turn: IPlayMatch = {
      playerID: this.currentPlayer,
      throw1Sector: parseInt(this.newThorwForm.value.throw1Sector),
      throw1Multiplier: parseInt(this.newThorwForm.value.throw1Multiplier),
      throw2Sector: parseInt(this.newThorwForm.value.throw2Sector),
      throw2Multiplier: parseInt(this.newThorwForm.value.throw2Multiplier),
      throw3Sector: parseInt(this.newThorwForm.value.throw3Sector),
      throw3Multiplier: parseInt(this.newThorwForm.value.throw3Multiplier),
    };

    const thrownpoints =
      turn.throw1Sector * turn.throw1Multiplier +
      turn.throw2Sector * turn.throw2Multiplier +
      turn.throw3Sector * turn.throw3Multiplier;

    this.matchesService.dartsParty(turn, this.match.id).subscribe((data) => {
      console.log(data);
      console.log(this.currentLeg);
      console.log(this.match);
      this.previousLeg = this.currentLeg;
      this.match = data.match;
      if (this.currentPlayer === this.match.homeId) {
        this.homeStat = data.stat;
      } else {
        this.awayStat = data.stat;
      }
      console.log('Mérkőzés: ', this.match);
      console.log('Home stat: ', this.homeStat);
      console.log('Away stat: ', this.awayStat);
      this.currentLeg = this.match.legs[0];
      console.log(this.currentLeg);
      if (this.currentPlayer === this.match.homeId) {
        this.homeThrows.push(thrownpoints);
      } else {
        this.awayThrows.push(thrownpoints);
      }
      console.log('Ez a previous leg: ', this.previousLeg);
      console.log('Ez a current leg:', this.currentLeg);
      if (this.currentLeg.starterPlayer !== this.previousLeg.starterPlayer) {
        this.currentPlayer = this.currentLeg.starterPlayer;
        this.homeThrows = [];
        this.awayThrows = [];
        if (this.currentPlayer === this.match.homeId) {
          this.currentPlayerName = this.match.homeName;
        } else {
          this.currentPlayerName = this.match.awayName;
        }
      } else {
        this.switchPlayer();
      }
      console.log(this.previousLeg);
      console.log(this.currentLeg);
      console.log(this.match);
      console.log(turn);
      console.log(thrownpoints);
    });
  }

  switchPlayer() {
    if (this.currentPlayer === this.match.homeId) {
      this.currentPlayer = this.match.awayId;
      this.currentPlayerName = this.match.awayName;
    } else {
      this.currentPlayer = this.match.homeId;
      this.currentPlayerName = this.match.homeName;
    }
  }
  // switchPlayer() {
  //   if (this.previousLeg.starterPlayer !== this.currentLeg.starterPlayer) {
  //     if (this.currentLeg.starterPlayer === this.match.homeId) {
  //       this.currentPlayer = this.match.homeId;
  //       this.currentPlayerName = this.match.homeName;
  //     } else {
  //       this.currentPlayer = this.match.awayId;
  //       this.currentPlayerName = this.match.awayName;
  //     }
  //   } else {
  //     if (this.currentPlayer === this.match.homeId) {
  //       this.currentPlayer = this.match.awayId;
  //       this.currentPlayerName = this.match.awayName;
  //     } else {
  //       this.currentPlayer = this.match.homeId;
  //       this.currentPlayerName = this.match.homeName;
  //     }
  //   }
  // }
}
