import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  name: string;
  cssBig: string;
  cssSmall: string;
  cssMiddle: string;
  cssBg: string;
  currentClassed: {};
  currentStyles: {};
  isBig: boolean;
  isRed = false;
  isUnchanged = true;

  constructor() {
  }

  ngOnInit() {
    this.isBig = true;
    this.cssBig = 'big';
    this.cssMiddle = 'middle';
    this.cssSmall = 'small';
    this.cssBg = 'bg';
    this.currentClassed = {
      'big': this.cssBig,
      'bg': this.cssBg,
    };

    this.currentStyles = {
      'color': this.isRed ? 'red' : 'green',
      'font-size': this.isBig ? 'x-large' : 'smaller',
      'font-weight': this.isUnchanged ? 'bold' : 'normal'
    };

    this.name = 'kevin';
  }

  onClick($event: Event) {
    console.log(event.type);
  }
}
