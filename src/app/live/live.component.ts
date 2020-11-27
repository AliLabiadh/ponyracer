import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RaceService} from '../race.service';
import {RaceModel} from '../models/race.model';
import {Subscription} from 'rxjs';
import {PonyWithPositionModel} from '../models/pony.model';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {
  raceModel: RaceModel;
  id: number;
  poniesWithPosition: Array<PonyWithPositionModel>;
  positionSubscription: Subscription;

  constructor(private raceService: RaceService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('raceId');
    this.raceService.get(this.id).subscribe(race => this.raceModel = race);
    this.positionSubscription = this.raceService.live(this.id).subscribe(positions => (this.poniesWithPosition = positions));
  }

  ngOnDestroy(): void {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }


}