import {Component, OnInit} from '@angular/core';
import {RaceService} from '../race.service';
import {RaceModel} from '../models/race.model';

@Component({
  selector: 'pr-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})

export class RacesComponent implements OnInit {

  raceList: Array<RaceModel> | undefined;
  constructor(private raceService: RaceService) { }

  ngOnInit(): void {
   this.raceList = this.raceService.list();
  }

}
