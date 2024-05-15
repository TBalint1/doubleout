import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { AllPlayersComponent } from './components/pages/all-players/all-players.component';
import { PlayerPageComponent } from './components/pages/player-page/player-page.component';
import { TournamentsComponent } from './components/pages/tournaments/tournaments.component';
import { MatchPageComponent } from './components/pages/match-page/match-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { NewTournamentPageComponent } from './components/pages/new-tournament-page/new-tournament-page.component';
import { TournamentPageComponent } from './components/pages/tournament-page/tournament-page.component';
import { TestPageComponent } from './components/pages/test-page/test-page.component';
import { NewTestPageComponent } from './components/pages/new-test-page/new-test-page.component';
import { DartsPartyPageComponent } from './components/pages/darts-party-page/darts-party-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:searchTerm', component: AllPlayersComponent },
  { path: 'players', component: AllPlayersComponent },
  { path: 'players/:id', component: PlayerPageComponent },
  { path: 'tournaments', component: TournamentsComponent },
  { path: 'matches/:id', component: MatchPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'tournaments/new', component: NewTournamentPageComponent },
  { path: 'tournament/:id', component: TournamentPageComponent },
  { path: 'test', component: TestPageComponent },
  { path: 'test/new', component: NewTestPageComponent },
  { path: 'matches/:id/onGoing', component: DartsPartyPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
