import {Component, OnInit} from '@angular/core';
import {GankService} from '../gank.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})

export class CarouselComponent implements OnInit {


  title = 'app';
  data;

  constructor(private gankService: GankService) {}

  ngOnInit(): void {
    this.getGanks();
  }

  getGanks(): void {
    this.gankService.getHeroesSlowly().then(results => this.data = results);
  }
}
