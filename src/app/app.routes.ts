import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {RacesComponent} from './races/races.component';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';

const ROUTES: Routes = [
  { path: '', component: HomeComponent},
  { path: 'races', component: RacesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {
    enableTracing: false,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutesModule { }
