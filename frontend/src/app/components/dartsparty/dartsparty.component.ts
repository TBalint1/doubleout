import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DartpartyService } from 'src/app/services/dartparty.service';
import { Leg, Match, Turn } from 'src/app/shared/models/Match';

@Component({
  selector: 'app-dartsparty',
  templateUrl: './dartsparty.component.html',
  styleUrls: ['./dartsparty.component.css']
})
export class DartspartyComponent {
  currentMatchId: string | undefined;
  match: Match | undefined;
  matchSubscription: Subscription | undefined;
  currentLeg: Leg | undefined;
  turn: Turn | undefined;
  
  constructor(private route: ActivatedRoute, private partyService: DartpartyService) {

  }

  ngOnInit(): void {
    this.matchSubscription = this.partyService.matchObservebale.subscribe(data => {
      this.match = data.match;
      console.log(this.match)
    });
    this.start()
  }

  start(): void {
    this.currentMatchId = this.route.snapshot.params['id'];
    this.partyService.startMatch(this.currentMatchId!);
  }

  throwLeg() {
    console.log("dobtam")
    if (this.currentLeg !== undefined) {
      this.partyService.throwLeg(this.currentLeg)
      this.currentLeg = undefined;
    }
  }


  setCurrentLegValue(){
    this.turn = new Turn()
  }


  ngOnDestroy(): void {
    if (this.matchSubscription !== undefined) {
      this.matchSubscription.unsubscribe();
    }
  }
}
