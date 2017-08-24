import {Component, OnInit} from '@angular/core';
import {GankService} from '../gank.service';
import {ParamMap, ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {Gank} from '../beans/Gank';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})

export class ListComponent implements OnInit {
  data;
  colsNum = 4;
  gutterSize = 10;
  rowHeight = '4:1';

  constructor(private gankService: GankService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const temp = this;
    this.route.paramMap
      .switchMap((params: ParamMap) => params.get('index'))
      .subscribe(result =>
        temp.getGanks(result)
      );
  }

  getGanks(value: string): void {
    this.gankService.getResult(30, +value).then(results => this.data = results);
  }

  toDetail(result: Gank): void {
    this.gankService.detail = result;
  }
}
