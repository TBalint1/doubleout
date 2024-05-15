import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MatchPageComponent } from './components/pages/match-page/match-page.component';
import { AllPlayersComponent } from './components/pages/all-players/all-players.component';
import { SearchComponent } from './components/partials/search/search.component';
import { PlayerPageComponent } from './components/pages/player-page/player-page.component';
import { TournamentsComponent } from './components/pages/tournaments/tournaments.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TitleComponent } from './components/partials/title/title.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { InputContainerComponent } from './components/partials/input-container/input-container.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { TextInputComponent } from './components/partials/text-input/text-input.component';
import { DefaultButtonComponent } from './components/partials/default-button/default-button.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { CalendarModule, DatePickerModule, TimePickerModule, DateRangePickerModule, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { NewTournamentPageComponent } from './components/pages/new-tournament-page/new-tournament-page.component';
import { SelectInputComponent } from './components/partials/select-input/select-input.component';
import { PlayerInputComponent } from './components/partials/player-input/player-input.component';
import { TournamentBlockComponent } from './components/partials/tournament-block/tournament-block.component';
import { TournamentPageComponent } from './components/pages/tournament-page/tournament-page.component';
import { TestPageComponent } from './components/pages/test-page/test-page.component';
import { NewTestPageComponent } from './components/pages/new-test-page/new-test-page.component';
import { DartsPartyPageComponent } from './components/pages/darts-party-page/darts-party-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    MatchPageComponent,
    AllPlayersComponent,
    SearchComponent,
    PlayerPageComponent,
    TournamentsComponent,
    LoginPageComponent,
    TitleComponent,
    InputContainerComponent,
    InputValidationComponent,
    TextInputComponent,
    DefaultButtonComponent,
    NotFoundComponent,
    RegisterPageComponent,
    NewTournamentPageComponent,
    SelectInputComponent,
    PlayerInputComponent,
    TournamentBlockComponent,
    TournamentPageComponent,
    TestPageComponent,
    NewTestPageComponent,
    DartsPartyPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    }),
    CalendarModule, DatePickerModule, TimePickerModule, DateRangePickerModule, DateTimePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
