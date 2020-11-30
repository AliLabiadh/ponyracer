import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {RacesComponent} from './races/races.component';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {BetComponent} from './bet/bet.component';
import {LiveComponent} from './live/live.component';
import {LoggedInGuard} from './logged-in.guard';
import {RaceResolver} from './race.resolver';
import {RacesResolver} from './races.resolver';
import {PendingRacesComponent} from './races/pending-races/pending-races.component';
import {FinishedRacesComponent} from './races/finished-races/finished-races.component';

const ROUTES: Routes = [
  { path: '', component: HomeComponent},
  { path: 'races', canActivate: [LoggedInGuard], children: [{
        path: '', component: RacesComponent, children: [
          { path: '', pathMatch: 'full', redirectTo: 'pending' },
          { path: 'pending', component: PendingRacesComponent, resolve: {
              races: RacesResolver }
          },
          { path: 'finished', component: FinishedRacesComponent, resolve: {
              races: RacesResolver }
          }
        ]
      },
      { path: ':raceId', component: BetComponent, resolve: {
          race: RaceResolver }
      },
      { path: ':raceId/live', component: LiveComponent, resolve: {
          race: RaceResolver
        }
      }
    ]
  },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {
    enableTracing: false,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutesModule { }
