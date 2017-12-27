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
        exist =  topLeftContains || bottomAndLeftContains;
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
    this.allLocation.set(id, event);
  }

  initViewLocation(view: any) {
    view.scrollX = view.marginLeft;
    view.scrollY = view.marginTop;
  }
}
