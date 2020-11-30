
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserModel} from './models/user.model';
import {environment} from '../environments/environment';
import {tap} from 'rxjs/operators';
import {JwtInterceptor} from './jwt.interceptor';
import {WsService} from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private postUserApi = environment.baseUrl;
  userEvents = new BehaviorSubject <UserModel>(undefined);

  constructor(private http: HttpClient,
              private jwtInterceptor: JwtInterceptor,
              private wsService: WsService) {
  this.retrieveUser();
}


register(login: string, password: string, birthYear: number): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.postUserApi}/api/users`, {
      login,
      password,
      birthYear
    });
  }

  authenticate(credentials: {login: string; password: string}): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.postUserApi}/api/users/authentication`,
      credentials
    ).pipe(
      tap(
        (user: UserModel) => this.storeLoggedInUser(user)));
  }

  storeLoggedInUser(user: UserModel): void{
    this.jwtInterceptor.setJwtToken(user.token);
    window.localStorage.setItem('rememberMe', JSON.stringify(user));
    this.userEvents.next(user);
  }

  retrieveUser(): void {
    const value = window.localStorage.getItem('rememberMe');
    if (value){
      const user = JSON.parse(value);
      this.jwtInterceptor.setJwtToken(user.token);
      this.userEvents.next(user);
    }
  }

  logout(): void {
    this.jwtInterceptor.removeJwtToken();
    window.localStorage.removeItem('rememberMe');
    this.userEvents.next(null);
  }

  scoreUpdates(userId: number): Observable<UserModel> {
    return this.wsService.connect<UserModel>(`/player/${userId}`);
  }

  isLoggedIn(): boolean {
    return !!window.localStorage.getItem('rememberMe');
  }


}
