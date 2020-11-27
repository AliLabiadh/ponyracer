import { Injectable } from '@angular/core';
import {interval, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {RaceModel} from './models/race.model';
import {map, take, tap} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {PonyWithPositionModel} from './models/pony.model';

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

  cancelBet(raceId: number): Observable<RaceModel>{
    return this.http.delete<RaceModel>(`${this.apiUrl}/api/races/${raceId}/bets`);
  }

  live(raceId: number): Observable<Array<PonyWithPositionModel>> {
    return interval(1000).pipe(
      take(101),
      map((position: any) => {
        return [
          {
            id: 1,
            name: 'Superb Runner',
            color: 'BLUE',
            position
          },
          {
            id: 2,
            name: 'Awesome Fridge',
            color: 'GREEN',
            position
          },
          {
            id: 3,
            name: 'Great Bottle',
            color: 'ORANGE',
            position
          },
          {
            id: 4,
            name: 'Little Flower',
            color: 'YELLOW',
            position
          },
          {
            id: 5,
            name: 'Nice Rock',
            color: 'PURPLE',
            position
          }
        ];
      })
    );
  }


}
