import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {RacesComponent} from './races/races.component';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {BetComponent} from './bet/bet.component';
import {LiveComponent} from './live/live.component';

const ROUTES: Routes = [
  { path: '', component: HomeComponent},
  { path: 'races',
    children: [
      {path: '', component: RacesComponent},
      {path: ':raceId', component: BetComponent},
      {path: ':raceId/live', component: LiveComponent}
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
