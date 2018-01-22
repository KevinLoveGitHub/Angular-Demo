import {Component, OnInit, Renderer2, ElementRef, ViewChild} from '@angular/core';
import {ViewInfo} from "./viewInfo";


@Component({
  selector: 'app-multi-page',
  templateUrl: './multi-page.component.html',
  styleUrls: ['./multi-page.component.css']
})
export class MultiPageComponent implements OnInit {

  SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};

  @ViewChild('root')
  root: ElementRef;

  row = new Array(18);
  column = new Array(8);
  rowValue: number;
  columnValue: number;
  selectedView: any;
  isPutViewInfo: any;
  zoom = 0.9;
  rootWidth: number;
  rootHeight: number;
  rootMarginLeft: number;
  viewHeight: number;
  views = [];
  optionViewHeight: number;
  hasPutViewContainer: Map<number, any>;
  smallViewContainer: Map<number, any>;
  createIndex: number;
  pageViewContainer = [];
  hasSaveViewInfo = [];
  pages = new Array(5);
  currentPageIndex = 0;

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit() {
    this.rootWidth = 1800 * this.zoom;
    this.rootHeight = 800 * this.zoom;
    this.viewHeight = 160;
    this.optionViewHeight = 120;
    this.rootMarginLeft = (innerWidth - this.rootWidth) / 2;
    this.rowValue = this.rootWidth / this.row.length;
    this.columnValue = this.rootHeight / this.column.length;
    this.hasPutViewContainer = new Map<number, any>();
    this.smallViewContainer = new Map<number, any>();
    this.createIndex = 0;
    for (let k = 0; k < this.pages.length; k++) {
      this.pages[k] = {
        component: [],
        hasPutView: []
      };
    }
    this.smallViewContainer = this.initSmallViewContainer(this.row.length, this.column.length);
    const view1 = {
      id: '1',
      img: './assets/个人信息中心.png',
      width: '300',
      height: '300'
    };
    const view2 = {
      id: '2',
      img: './assets/今日作业.png',
      width: '400',
      height: '300'
    };
    const view3 = {
      id: '3',
      img: './assets/今日值日.png',
      width: '300',
      height: '400'
    };
    const view4 = {
      id: '4',
      img: './assets/今日值日.png',
      width: '300',
      height: '400'
    };
    const view5 = {
      id: '5',
      img: './assets/公告.png',
      width: '600',
      height: '400'
    };
    const view6 = {
      id: '6',
      img: './assets/天气.png',
      width: '600',
      height: '400'
    };
    const view7 = {
      id: '7',
      img: './assets/校园天地.png',
      width: '300',
      height: '300'
    };
    const view8 = {
      id: '8',
      img: './assets/班级之星.png',
      width: '400',
      height: '300'
    };
    const view9 = {
      id: '9',
      img: './assets/班级相册.png',
      width: '600',
      height: '500'
    };
    const view10 = {
      id: '10',
      img: './assets/班级签到.png',
      width: '600',
      height: '400'
    };

    const view11 = {
      id: '11',
      img: './assets/班级荣誉.png',
      width: '600',
      height: '800'
    };
    const view12 = {
      id: '12',
      img: './assets/班级评比.png',
      width: '800',
      height: '500'
    };
    const view13 = {
      id: '13',
      img: './assets/空.png',
      width: '400',
      height: '400'
    };

    this.views.push(view1, view2, view3, view4, view5, view6, view7, view8, view9, view10, view11, view12, view13);
  }

  initSmallViewContainer(rowLength: number, columnLength: number): Map<number, any> {
    const smallViewState = new Map();
    for (let x = 0; x < columnLength; x++) {
      for (let y = 0; y < rowLength; y++) {
        const _view = {
          x: y * this.rowValue,
          y: x * this.columnValue,
          clickEnable: true
        };
        smallViewState.set(x * 18 + y, _view);
      }
    }
    return smallViewState;
  }


  selectView(event: any) {
    const target = event.target;
    // 判断选中是否当前选中组件
    if (this.selectedView != null && this.selectedView.id === target.id) {
      return;
    }
    // 置空当前选中组件的border
    if (this.selectedView != null) {
      this.selectedView.style.border = null;
    }
    // 置空已经放置的组件对象
    if (this.isPutViewInfo != null) {
      this.isPutViewInfo.edit = false;
      this.saveView(this.isPutViewInfo);
      this.isPutViewInfo = null;
    }
    this.selectedView = target;
    this.selectedView.style.border = 'aqua solid 10px';

    const view = this.views.find(v => v.id === this.selectedView.id);
    const width = view.width * this.zoom;
    const height = view.height * this.zoom;
    this.renderSmallView(width, height);
    console.log(this.selectedView);
  }

  rootClick(event: any) {
    if (this.isPutViewInfo != null && this.isPutViewInfo.edit) {
      const locationInfo = this.getViewLocationInfo(this.isPutViewInfo);
      const marginLeft = event.layerX + locationInfo.left;
      const marginTop = event.layerY + locationInfo.top;
      this.moveView(this.isPutViewInfo, marginLeft, marginTop);
    }
    console.log('root click');
  }

  putView(event: any) {
    event.stopPropagation();
    if (this.selectedView == null && this.isPutViewInfo == null) {
      return;
    }
    const marginLeft = event.layerX;
    const marginTop = event.layerY;

    if (this.isPutViewInfo == null) {
      this.isPutViewInfo = this.createViewInfo(this.selectedView, marginLeft, marginTop);
    } else {
      this.changeViewInfo(this.isPutViewInfo, marginLeft, marginTop);
    }
  }


  changeViewInfo(viewInfo: ViewInfo, marginLeft: any, marginTop: any) {
    marginLeft = this.getMarginLeft(marginLeft);
    marginTop = this.getMarginTop(marginTop);
    const column = Math.floor(Number(marginLeft.slice(0, -2)) / this.columnValue);
    const row = Math.floor(Number(marginTop.slice(0, -2)) / this.rowValue);
    const index = (row * this.row.length) + column;
    if (!this.smallViewContainer.get(index).clickEnable) {
      this.locationError();
      return;
    }
    viewInfo.marginLeft = marginLeft;
    viewInfo.marginTop = marginTop;
  }

  locationError() {
    alert('位置不可用');
  }


  renderSmallView(width: number, height: number) {
    const _this = this;
    if (this.hasSaveViewInfo.length === 0) {
      this.smallViewContainer.forEach(function (smallViewValue, key) {
        smallViewValue.clickEnable = false;
        const offsetY = smallViewValue.y + height;
        const offsetX = smallViewValue.x + width;
        if (offsetX <= _this.rootWidth && offsetY <= _this.rootHeight) {
          smallViewValue.clickEnable = true;
        }
      });
      return;
    }

    this.smallViewContainer.forEach(function (smallViewValue, key) {
      let isDisEnable = false;
      _this.hasSaveViewInfo.forEach(function (putView) {
        if (isDisEnable) {
          return;
        }
        const locationInfo = _this.getViewLocationInfo(putView);
        const offsetX = smallViewValue.x + width;
        const overRight = smallViewValue.x >= locationInfo.right;
        const offsetY = smallViewValue.y + height;
        const overBottom = smallViewValue.y >= locationInfo.bottom;

        // if (key === 16) {
        //   debugger;
        // }

        smallViewValue.clickEnable = false;

        if (overRight || overBottom) {
          if (offsetX <= _this.rootWidth && offsetY <= _this.rootHeight) {
            smallViewValue.clickEnable = true;
          }
          return;
        }

        if (offsetX <= locationInfo.left && offsetY <= _this.rootHeight) {
          smallViewValue.clickEnable = true;
          return;
        }

        if (offsetY <= locationInfo.top && offsetY <= _this.rootHeight && offsetX <= _this.rootWidth) {
          smallViewValue.clickEnable = true;
          return;
        }

        isDisEnable = true;
      });
    });
  }


  moveView(view: any, marginLeft: any, marginTop: any) {
    marginLeft = this.getMarginLeft(marginLeft);
    marginTop = this.getMarginTop(marginTop);
    const column = Math.floor(Number(marginLeft.slice(0, -2)) / this.columnValue);
    const row = Math.floor(Number(marginTop.slice(0, -2)) / this.rowValue);
    const index = (row * this.row.length) + column;
    if (!this.smallViewContainer.get(index).clickEnable) {
      this.locationError();
      return;
    }
    view.marginLeft = marginLeft;
    view.marginTop = marginTop;
  }


  createViewInfo(selectedView: any, marginLeft: any, marginTop: any): ViewInfo {
    const srcUrl = selectedView.currentSrc;
    const view = this.views.find(v => v.id === selectedView.id);
    const width = view.width * this.zoom;
    const height = view.height * this.zoom;
    marginLeft = this.getMarginLeft(marginLeft);
    marginTop = this.getMarginTop(marginTop);

    const viewInfo = new ViewInfo();
    viewInfo.width = width;
    viewInfo.height = height;
    viewInfo.index = this.createIndex++;
    viewInfo.id = selectedView.id;
    viewInfo.marginLeft = marginLeft;
    viewInfo.marginTop = marginTop;
    viewInfo.img = srcUrl;
    viewInfo.edit = true;

    this.pageViewContainer.push(viewInfo);
    return viewInfo;
  }

  viewClick(event: any) {
    const index = event.currentTarget.attributes.index.value;
    const view = this.pageViewContainer.find(obj => obj.index == index);

    const indexOf = this.hasSaveViewInfo.indexOf(view);
    if (indexOf !== -1) {
      this.hasSaveViewInfo.splice(indexOf, 1);
    }

    if (this.isPutViewInfo != null && this.isPutViewInfo !== view) {
      this.isPutViewInfo.edit = false;
      this.saveView(this.isPutViewInfo);
    }

    this.isPutViewInfo = view;

    const locationInfo = this.getViewLocationInfo(view);
    this.renderSmallView(locationInfo.width, locationInfo.height);

    if (view.edit === false) {
      view.edit = true;
      event.stopPropagation();
    }
  }

  confirmClick(event: any) {
    event.stopPropagation();
    const view = event.currentTarget;
    const parentView = view.parentElement;
    if (this.isPutViewInfo == null) {
      this.isPutViewInfo = this.pageViewContainer.find(obj => obj.index == parentView.attributes.index.value);
    }

    this.saveView(this.isPutViewInfo);
    this.isPutViewInfo.edit = false;
    this.isPutViewInfo = null;
    if (this.selectedView != null) {
      this.selectedView.style.border = null;
      this.selectedView = null;
    }
  }

  cancelClick(event: any) {
    event.stopPropagation();
    const parentElement = event.currentTarget.parentElement;
    const viewInfo = this.pageViewContainer.find(obj => obj.index == parentElement.attributes.index.value);
    const index = this.pageViewContainer.indexOf(viewInfo);
    this.pageViewContainer.splice(index, 1);
    this.isPutViewInfo = null;
  }

  getMarginLeft(marginLeft: any): string {
    return Math.floor(marginLeft / this.columnValue) * this.columnValue + 'px';
  }

  getMarginTop(marginTop: any): string {
    return Math.floor(marginTop / this.rowValue) * this.rowValue + 'px';
  }


  saveView(view: any) {
    this.hasSaveViewInfo.push(view);
    console.log('saveView: ' + this.hasSaveViewInfo);
  }

  /**
   * 获取元素的 margin 值
   * @param view 元素
   * @returns {any} marginTop marginLeft
   */
  getViewLocationInfo(view: any): any {
    let margins: {};
    const topLocation = Number(view.marginTop.slice(0, -2));
    const leftLocation = Number(view.marginLeft.slice(0, -2));
    const bottomLocation = view.height + topLocation;
    const rightLocation = view.width + leftLocation;
    margins = {
      width: view.width,
      height: view.height,
      top: topLocation,
      left: leftLocation,
      bottom: bottomLocation,
      right: rightLocation
    };
    return margins;
  }

  swipe(currentIndex: number, action: any) {
    action = action.type;
    console.log(currentIndex, action);
    if (currentIndex > this.pages.length || currentIndex < 0) {
      return;
    }

    let nextIndex = 0;

    // next
    if (action === this.SWIPE_ACTION.LEFT) {
      const isLast = currentIndex === this.pages.length - 1;
      nextIndex = isLast ? 0 : currentIndex + 1;
    }

    // previous
    if (action === this.SWIPE_ACTION.RIGHT) {
      const isFirst = currentIndex === 0;
      nextIndex = isFirst ? this.pages.length - 1 : currentIndex - 1;
    }

    this.pages[this.currentPageIndex].component = this.pageViewContainer;
    this.pages[this.currentPageIndex].smallViewState = this.smallViewContainer;
    this.pages[this.currentPageIndex].hasPutView = this.hasSaveViewInfo;
    this.currentPageIndex = nextIndex;
    const pageData = this.pages[nextIndex];
    this.pageViewContainer = pageData.component;
    let smallViewState = pageData.smallViewState;
    if (!smallViewState) {
      pageData.smallViewState = smallViewState = this.initSmallViewContainer(this.row.length, this.column.length);
    }
    this.smallViewContainer = smallViewState;
    this.hasSaveViewInfo = pageData.hasPutView;
    this.isPutViewInfo = null;
    // 置空当前选中组件的border
    if (this.selectedView != null) {
      this.selectedView.style.border = null;
    }
    this.selectedView = null;
    console.log('swipe', nextIndex);
  }


  savePageData(event: any) {
    this.pages[this.currentPageIndex].component = this.pageViewContainer;
    this.pages[this.currentPageIndex].smallViewState = this.smallViewContainer;
    this.pages[this.currentPageIndex].hasPutView = this.hasSaveViewInfo;
    console.log('savePageData', this.pages);
  }
}
