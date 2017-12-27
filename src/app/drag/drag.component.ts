import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.css']
})
export class DragComponent implements OnInit {

  tmpPageX: number;
  tmpPageY: number;
  @Input() scrollX = 100;
  @Input() scrollY = 780;
  marginLeft: number;
  marginTop: number;
  maxMarginLeft: number;
  maxMarginTop: number;
  width: number;
  height: number;
  topBorder: number;
  bottomBorder: number;
  leftBorder: number;
  rightBorder: number;

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
    this.tmpPageX = 0;
    this.tmpPageY = 0;
  }

  myTouch(event: TouchEvent) {

    const pageX = event.touches[0].pageX;
    const pageY = event.touches[0].pageY;
    const clientX = event.touches[0].clientX;
    const clientY = event.touches[0].clientY;
    const screenX = event.touches[0].screenX;
    const screenY = event.touches[0].screenY;

    if (this.tmpPageX === 0) {
      this.tmpPageX = pageX;
    }
    if (this.tmpPageY === 0) {
      this.tmpPageY = pageY;
    }

    let x = pageX - this.tmpPageX + this.marginLeft;
    x = x < 0 ? 0 : x;
    x = x > this.maxMarginLeft ? this.maxMarginLeft : x;
    this.scrollX = x;
    let y = pageY - this.tmpPageY + this.marginTop;
    y = y < 0 ? 0 : y;
    y = y > this.maxMarginTop ? this.maxMarginTop : y;
    this.scrollY = y;

    // console.log('pageX: ' + pageX);
    // console.log('pageY: ' + pageY);
    // console.log('clientX: ' + clientX);
    // console.log('clientY: ' + clientY);
    // console.log('screenX: ' + screenX);
    // console.log('screenY: ' + screenY);
    // console.log('scrollX: ' + this.scrollX);
    // console.log('scrollY: ' + this.scrollY);
  }

  myTouchStart(event: any) {
    console.log('myTouchStart');
    this.tmpPageX = 0;
    this.tmpPageY = 0;
    this.width = Number(event.currentTarget.style.width.slice(0, -2));
    this.height = Number(event.currentTarget.style.height.slice(0, -2));
    this.marginLeft = Number(event.currentTarget.style.marginLeft.slice(0, -2));
    this.marginTop = Number(event.currentTarget.style.marginTop.slice(0, -2));

    this.maxMarginLeft = window.innerWidth - this.width;
    this.maxMarginTop = window.innerHeight - this.height;
  }

  myTouchEnd(event: TouchEvent) {
    console.log('myTouchEnd');
    this.topBorder = this.scrollY;
    this.leftBorder = this.scrollX;
    this.bottomBorder = this.scrollY + this.height;
    this.rightBorder = this.scrollX + this.width;
    // console.log('topBorder: ' + this.topBorder);
    // console.log('bottomBorder: ' + this.bottomBorder);
    // console.log('leftBorder: ' + this.leftBorder);
    // console.log('rightBorder: ' + this.rightBorder);
    const location = {
      'top': this.topBorder,
      'bottom': this.bottomBorder,
      'left': this.leftBorder,
      'right': this.rightBorder
    };
    this.change.emit(location);
  }
}
