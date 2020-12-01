import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../user.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'pr-money-history',
  templateUrl: './money-history.component.html',
  styleUrls: ['./money-history.component.css']
})
export class MoneyHistoryComponent implements OnInit, AfterViewInit  {
  @ViewChild('chart') canvas: ElementRef<HTMLCanvasElement>;

  moneyChart: Chart;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const contexte = this.canvas.nativeElement;
    this.userService.getMoneyHistory().subscribe(history => {
      this.moneyChart = new Chart(contexte, {
        type: 'line',
        data: {
          labels: history.map(data => data.instant),
          datasets: [
            {
              label: 'Money history',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              data: history.map(data => data.money)
            }
          ]
        },
        options: {
          scales: {
            xAxes: [
              {
                type: 'time'
              }
            ]
          }
        }
      });
    });
  }

}
