import {Component, OnInit} from '@angular/core';
import {GankService} from '../gank.service';
import {Result} from '../beans/Result';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})

export class CarouselComponent implements OnInit {
  data: Result;

  constructor(private gankService: GankService) {
  }

  ngOnInit(): void {
    this.getGanks();
  }

  getGanks(): void {
    this.gankService.getResult(10, 1).then(results => this.data = results);
  }

  toPhoto(): void {

  }
}
