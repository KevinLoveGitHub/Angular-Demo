import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  allLocation = new Map();

  constructor() {
  }

  ngOnInit() {
  }

  checkLocation(id: any, view: any, event: any) {
    console.log('checkLocation', id);
    if (this.allLocation.size === 0) {
      this.addLocation(id, event);
      return;
    }

    if (this.allLocation.size === 1 && this.allLocation.has(id)) {
      this.addLocation(id, event);
      return;
    }

    let exist = false;
    this.allLocation.forEach((location, key) => {
      if (id !== key && !exist) {
        const topContains = event.top > location.top && event.top < location.bottom;
        const bottomContains = event.bottom < location.bottom && event.bottom > location.top;
        const leftContains = event.left > location.left && event.left < location.right;
        const rightContains = event.right < location.right && event.right > location.left;

        const leftOrRightContains = leftContains || rightContains;
        const topLeftContains = topContains && leftOrRightContains;
        const bottomAndLeftContains = bottomContains && leftOrRightContains;

        const rightAndLeftInner = event.right > location.right && event.left < location.left;
        const topAndBottomInner = event.top < location.top && event.bottom > location.bottom;
        const top_Bottom_RightInner = topAndBottomInner && rightContains;
        const top_Bottom_LeftInner = topAndBottomInner && leftContains;
        const right_Left_TopInner = rightAndLeftInner && topContains;
        const right_Left_BottomInner = rightAndLeftInner && bottomContains;

        exist = topLeftContains
          || bottomAndLeftContains
          || top_Bottom_RightInner
          || top_Bottom_LeftInner
          || right_Left_TopInner
          || right_Left_BottomInner
          || (rightAndLeftInner && topAndBottomInner);
      }
    });
    if (exist) {
      this.initViewLocation(view);
    } else {
      this.addLocation(id, event);
      console.log('checkLocation', this.allLocation);
    }
  }

  addLocation(id: any, event: any) {
    if (event != null) {
      this.allLocation.set(id, event);
    }
  }

  initViewLocation(view: any) {
    view.scrollX = view.marginLeft;
    view.scrollY = view.marginTop;
    if (view.marginTop > 700) {
      view.viewHeight = view.viewInitHeight;
      view.viewWidth = view.viewInitWidth;
    }
  }
}
