import {Component, Input, OnInit} from '@angular/core';
import {RaceModel} from '../models/race.model';

@Component({
  selector: 'pr-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {

  @Input() raceModel?: RaceModel = {id: 0, name: '', ponies: [{id: 0, name: '', color: ''}], startInstant: ''};


  constructor() { }

  ngOnInit(): void {
  }

}
