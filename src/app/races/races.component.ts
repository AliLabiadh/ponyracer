import {Component, OnInit} from '@angular/core';
import {RaceService} from '../race.service';
import {RaceModel} from '../models/race.model';

@Component({
  selector: 'pr-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})

export class RacesComponent implements OnInit {

  raceList: Array<RaceModel> = [];
  apiList: Array<RaceModel> = [];
  constructor(private raceService: RaceService) { }

  ngOnInit(): void {
   this.raceService.list.subscribe(races => this.raceList = races);
   this.raceService.get().subscribe(
      raceList => {
        this.apiList = raceList;
      }
    );
  }

}
