import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {UserModel} from './models/user.model';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private postUserApi = 'https://ponyracer.ninja-squad.com/api/users';
  userEvents = new Subject<UserModel>();

  constructor(private http: HttpClient) { }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
     return this.http.post<UserModel>(this.postUserApi, {
      login,
      password,
      birthYear
    });
  }

  authenticate(credentials: {login: string; password: string}): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.postUserApi}/authentication`,
      credentials
    ).pipe(
      tap(
        (user: UserModel) => this.userEvents.next(user)));
  }

}


