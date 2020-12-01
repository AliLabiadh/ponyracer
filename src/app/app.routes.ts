import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {LoggedInGuard} from './logged-in.guard';

const ROUTES: Routes = [
  { path: '', component: HomeComponent},
  { path: 'races',
    loadChildren: () => import('./races/races.module').then(m => m.RacesModule),
    canActivate: [LoggedInGuard]},
  { path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, {
    enableTracing: false,
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutesModule { }
