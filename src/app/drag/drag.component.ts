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
  @Input() viewInitWidth = 150;
  @Input() viewInitHeight = 150;
  @Input() zoom: number;
  marginLeft: number;
  marginTop: number;
  maxMarginLeft: number;
  maxMarginTop: number;
  topBorder: number;
  bottomBorder: number;
  leftBorder: number;
  rightBorder: number;

  initMarginLeft: number;
  initMarginTop: number;

  viewWidth: number;
  viewHeight: number;

  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
    this.viewWidth = this.viewInitWidth;
    this.viewHeight = this.viewInitHeight;
    this.tmpPageX = 0;
    this.tmpPageY = 0;
    this.initMarginLeft = this.scrollX;
    this.initMarginTop = this.scrollY;
    this.maxMarginTop = this.scrollY;
  }

  myTouch(event: any) {

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
    x = x < 60 ? 60 : x;
    x = x > this.maxMarginLeft ? this.maxMarginLeft : x;
    this.scrollX = x;
    let y = pageY - this.tmpPageY + this.marginTop;
    y = y < 0 ? 0 : y;
    y = y > this.maxMarginTop ? this.maxMarginTop : y;
    y = y + this.viewHeight > 940 ? 940 - this.viewHeight : y;
    this.scrollY = y;


    if (this.scrollY < 700 && this.viewWidth === this.viewInitWidth && this.viewHeight === this.viewInitHeight) {
      this.viewWidth = this.viewInitWidth * this.zoom;
      this.viewHeight = this.viewInitHeight * this.zoom;
      event.currentTarget.style.width = this.viewWidth + 'px';
      event.currentTarget.style.height = this.viewHeight + 'px';
    }

    this.maxMarginLeft = window.innerWidth - this.viewWidth - 60;


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
    // this.width = Number(event.currentTarget.style.width.slice(0, -2));
    // this.height = Number(event.currentTarget.style.height.slice(0, -2));
    this.marginLeft = Number(event.currentTarget.style.marginLeft.slice(0, -2));
    this.marginTop = Number(event.currentTarget.style.marginTop.slice(0, -2));
    //
    // if (this.viewInitHeight < 0) {
    //   this.viewInitHeight = this.height;
    // }
    // if (this.viewInitWidth < 0) {
    //   this.viewInitWidth = this.width;
    // }

    // this.maxMarginTop = window.innerHeight - this.height;
  }

  myTouchEnd(event: any) {
    console.log('myTouchEnd');
    this.topBorder = this.scrollY;
    this.leftBorder = this.scrollX;
    this.bottomBorder = this.scrollY + this.viewHeight;
    this.rightBorder = this.scrollX + this.viewWidth;

    let location;
    if (this.bottomBorder > 700) {
      const style = event.currentTarget.style;
      style.width = this.viewInitWidth + 'px';
      style.height = this.viewInitHeight + 'px';
      style.marginTop = this.initMarginTop + 'px';
      style.marginLeft = this.initMarginLeft + 'px';
      this.viewWidth = this.viewInitWidth;
      this.viewHeight = this.viewInitHeight;
    } else {
      location = {
        'top': this.topBorder,
        'bottom': this.bottomBorder,
        'left': this.leftBorder,
        'right': this.rightBorder
      };
    }
    // console.log('topBorder: ' + this.topBorder);
    // console.log('bottomBorder: ' + this.bottomBorder);
    // console.log('leftBorder: ' + this.leftBorder);
    // console.log('rightBorder: ' + this.rightBorder);

    this.change.emit(location);
  }
}
