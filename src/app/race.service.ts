import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RaceModel} from './models/race.model';
import {tap} from 'rxjs/operators';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  constructor(private http: HttpClient) { }
  private readonly apiUrl = environment.baseUrl;

  list(): Observable<Array<RaceModel>> {
    return this.http.get<Array<RaceModel>>(`${this.apiUrl}/api/races?status=PENDING`).pipe(tap(l => console.log([l])));
  }

  bet(raceId: number, ponyId: number): Observable<RaceModel>{
    return this.http.post<RaceModel>(`${this.apiUrl}/api/races/${raceId}/bets`, {ponyId});
  }

  get(id: number): Observable<RaceModel>{
    return  this.http.get<RaceModel>(`${this.apiUrl}/api/races/${id}`);
  }

}
