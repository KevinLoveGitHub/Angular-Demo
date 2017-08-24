import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {GankService} from '../gank.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})

export class ListComponent implements OnInit {
  url = 'https://ws1.sinaimg.cn/large/610dc034ly1fis7dvesn6j20u00u0jt4.jpg';
  data;
  colsNum = 2;
  gutterSize = 10;
  rowHeight = '4:1';

  constructor(private gankService: GankService) {
  }

  ngOnInit(): void {
    this.getGanks();
  }

  getGanks(): void {
    this.gankService.getResult(30, 2).then(results => this.data = results);
  }
}
