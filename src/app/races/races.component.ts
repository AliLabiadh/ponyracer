import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pr-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css']
})
export class RacesComponent implements OnInit {

  raceList: any[] | undefined;
  constructor() { }

  ngOnInit(): void {
   this.raceList = [{ name: 'Lyon' }, { name: 'London' }, { name: 'Paris' }];
  }

}
