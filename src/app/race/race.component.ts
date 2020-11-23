import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'pr-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit {

  @Input() raceModel: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
