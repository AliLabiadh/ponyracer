import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  constructor() { }

  list = of(
    [{name: 'Lyon'},
    {name: 'Los Angeles'},
    {name: 'Sydney'},
    {name: 'Tokyo'}])
    .pipe(delay(500));
}
