import {Component, OnInit} from '@angular/core';
import {RaceModel} from '../models/race.model';
import {ActivatedRoute} from '@angular/router';
import {RaceService} from '../race.service';
import {PonyModel} from '../models/pony.model';

@Component({
  selector: 'pr-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent implements OnInit {
  raceModel: RaceModel;
  id: number;
  betFailed = false;

  constructor(private route: ActivatedRoute,
              private raceService: RaceService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('raceId');
    this.raceService.get(this.id).subscribe(race => (this.raceModel = race));
  }

  betOnPony(pony: PonyModel): void{
  this.raceService.bet(this.raceModel.id, pony.id).subscribe(
    race => this.raceModel = race, error => this.betFailed = true );
  }

  isPonySelected(pony: PonyModel): boolean{
    if (pony.id === this.raceModel.betPonyId){
      return true;
    }
    return false;
  }

}
