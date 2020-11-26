import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RacesComponent } from './races/races.component';
import { RaceComponent } from './race/race.component';
import { PonyComponent } from './pony/pony.component';
import {HttpClientModule} from '@angular/common/http';
import { FromNowPipe } from './from-now.pipe';
import {RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import {AppRoutesModule} from './app.routes';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AppComponent, MenuComponent, RacesComponent, RaceComponent, PonyComponent,
    FromNowPipe, HomeComponent, RegisterComponent, LoginComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutesModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
