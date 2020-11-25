import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserModel} from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private postUserApi = 'https://ponyracer.ninja-squad.com/api/users';
  constructor(private http: HttpClient) { }

  register(login: string, password: string, birthYear: number): Observable<UserModel> {
     return this.http.post<UserModel>(this.postUserApi, {
      login,
      password,
      birthYear
    });
  }
  }


