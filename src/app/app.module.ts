import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import {AppRoutesModule} from './app.routes';
import { JwtInterceptor } from './jwt.interceptor';
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent
    ]
  ,
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutesModule,
    NgbCollapseModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useExisting: JwtInterceptor,
    multi: true
  }],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
