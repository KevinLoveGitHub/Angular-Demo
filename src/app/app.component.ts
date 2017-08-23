import {Component, OnInit} from '@angular/core';
import {GankService} from './gank.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GankService]
})

export class AppComponent implements OnInit {


  title = 'app';
  // gank1 = new Gank('https://ws1.sinaimg.cn/large/610dc034ly1fitcjyruajj20u011h412.jpg');
  // gank2 = new Gank('https://ws1.sinaimg.cn/large/610dc034ly1fis7dvesn6j20u00u0jt4.jpg');
  // gank3 = new Gank('https://ws1.sinaimg.cn/large/610dc034ly1fil82i7zsmj20u011hwja.jpg');
  // gank4 = new Gank('https://ws1.sinaimg.cn/large/610dc034ly1fik2q1k3noj20u00u07wh.jpg');
  // gank5 = new Gank('https://ws1.sinaimg.cn/large/610dc034ly1fir1jbpod5j20ip0newh3.jpg');
  // list: Array<Gank> = [this.gank1, this.gank2, this.gank3, this.gank4, this.gank5];
  // data = new Result('123', this.list);
  data;

  constructor(private gankService: GankService) {}

  ngOnInit(): void {
    this.getGanks();
  }

  getGanks(): void {
    this.gankService.getHeroesSlowly().then(results => this.data = results);
  }

  toPhoto(): void {
    const temp = this;
    temp.title = 'title';
    console.log(temp.data);
  }

}


