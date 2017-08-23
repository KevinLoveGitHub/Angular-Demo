import {Component} from '@angular/core';
import {Gank} from './Gank';
import {Result} from './Result';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: '<h1 (click)="toPhoto()">{{title}}</h1>'
})

export class AppComponent {
  title = 'app';
  gank4 = new Gank('http://valor-software.com/ngx-bootstrap/assets/images/nature/4.jpg');
  gank5 = new Gank('http://valor-software.com/ngx-bootstrap/assets/images/nature/5.jpg');
  gank6 = new Gank('http://valor-software.com/ngx-bootstrap/assets/images/nature/6.jpg');
  list: Array<Gank> = [this.gank4, this.gank5, this.gank6];
  data = new Result('123', this.list);

  toPhoto(): void {
    const temp = this;
    this.title = 'title';
    console.log(temp.data);
  }
}


