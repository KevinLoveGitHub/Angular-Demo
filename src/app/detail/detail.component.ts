import {Component, OnInit, Input} from '@angular/core';
import {GankService} from '../gank.service';
import {Gank} from '../beans/Gank';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})

export class DetailComponent implements OnInit {
  detail: Gank;

  constructor(private gankService: GankService) {
  }

  ngOnInit(): void {
    this.detail = this.gankService.detail;
    console.log(this.detail);
  }
}
