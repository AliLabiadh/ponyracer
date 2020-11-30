import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {LiveRaceModel, RaceModel} from './models/race.model';
import {map, takeWhile, tap} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {PonyWithPositionModel} from './models/pony.model';
import {WsService} from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  constructor(private http: HttpClient, private wsService: WsService) { }
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
    return this.wsService.connect<LiveRaceModel>(`/race/${raceId}`).pipe(
      takeWhile(liveRace => liveRace.status !== 'FINISHED'),
      map(liveRace => liveRace.ponies));
  }


}
