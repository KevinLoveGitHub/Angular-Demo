import {Component, OnInit, Renderer2, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-available-view',
  templateUrl: './available-view.component.html',
  styleUrls: ['./available-view.component.css']
})
export class AvailableViewComponent implements OnInit {

  @ViewChild('root')
  root: ElementRef;

  row = new Array(18);
  column = new Array(8);
  rowValue: number;
  columnValue: number;
  selectedView: any;
  isPutView: any;
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
    this.initSmallViewContainer(this.row.length, this.column.length);
    const view1 = {
      id: '1',
      img: './assets/clock.jpg',
      width: '600',
      height: '800'
    };
    const view2 = {
      id: '2',
      img: './assets/clock.jpg',
      width: '400',
      height: '300'
    };
    const view3 = {
      id: '3',
      img: './assets/clock.jpg',
      width: '400',
      height: '300'
    };
    const view4 = {
      id: '4',
      img: './assets/clock.jpg',
      width: '800',
      height: '500'
    };
    const view5 = {
      id: '5',
      img: './assets/clock.jpg',
      width: '400',
      height: '400'
    };
    const view6 = {
      id: '6',
      img: './assets/clock.jpg',
      width: '400',
      height: '400'
    };

    this.views.push(view1, view2, view3, view4, view5, view6);
  }

  initSmallViewContainer(rowLength: number, columnLength: number) {
    for (let x = 0; x < columnLength; x++) {
      for (let y = 0; y < rowLength; y++) {
        const _view = {
          x: y * this.rowValue,
          y: x * this.columnValue,
          clickEnable: true
        };
        this.smallViewContainer.set(x * 18 + y, _view);
      }
    }
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
    if (this.isPutView != null) {
      this.renderer.removeChild(this.isPutView.parent, this.isPutView);
      this.isPutView = null;
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
    if (this.isPutView != null && this.isPutView.reEdit) {
      const locationInfo = this.getViewLocationInfo(this.isPutView);
      const marginLeft = event.layerX + locationInfo.left;
      const marginTop = event.layerY + locationInfo.top;
      this.moveView(this.isPutView, marginLeft, marginTop);
    }
    console.log('root click');
  }

  putView(event: any) {
    event.stopPropagation();
    if (this.selectedView == null && this.isPutView == null) {
      return;
    }
    const marginLeft = event.layerX;
    const marginTop = event.layerY;

    // const width = Number(style.width.slice(0, -2)) * 2 + 'px';
    // const height = Number(style.height.slice(0, -2)) * 2 + 'px';
    if (this.isPutView == null) {
      this.isPutView = this.createView(this.selectedView, marginLeft, marginTop);
    } else {
      this.moveView(this.isPutView, marginLeft, marginTop);
    }
  }

  locationError() {
    alert('位置不可用');
  }


  renderSmallView(width: number, height: number) {
    const _this = this;
    if (this.hasPutViewContainer.size === 0) {
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
      _this.hasPutViewContainer.forEach(function (putView) {
        if (isDisEnable) {
          return;
        }
        const locationInfo = _this.getViewLocationInfo(putView);
        const offsetX = smallViewValue.x + width;
        const overRight = smallViewValue.x >= locationInfo.right;
        const offsetY = smallViewValue.y + height;
        const overBottom = smallViewValue.y >= locationInfo.bottom;

        if (key === 0) {
          debugger;
        }

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

        if (offsetY <= locationInfo.top && offsetY <= _this.rootHeight) {
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
    view.style.marginLeft = marginLeft;
    view.style.marginTop = marginTop;
  }

  createView(selectedView: any, marginLeft: any, marginTop: any): ElementRef {
    const srcUrl = selectedView.currentSrc;
    const view = this.views.find(v => v.id === selectedView.id);
    const width = view.width * this.zoom + 'px';
    const height = view.height * this.zoom + 'px';
    marginLeft = this.getMarginLeft(marginLeft);
    marginTop = this.getMarginTop(marginTop);

    const div = this.renderer.createElement('div');
    const img = this.renderer.createElement('img');
    this.renderer.setAttribute(img, 'src', srcUrl);
    const imgStyle = img.style;
    imgStyle.width = width;
    imgStyle.height = height;
    imgStyle.position = 'absolute';
    const divStyle = div.style;
    divStyle.width = width;
    divStyle.height = height;
    divStyle.marginLeft = marginLeft;
    divStyle.marginTop = marginTop;
    divStyle.position = 'absolute';
    div.id = selectedView.id;
    div.index = this.createIndex++;
    div.reEdit = false;

    const _this = this;
    // 设置click事件
    this.renderer.listen(div, 'click', function (event) {
      _this.isPutView = event.currentTarget;
      const key = _this.isPutView.index;
      const isHas = _this.hasPutViewContainer.has(key);
      if (isHas) {
        _this.hasPutViewContainer.delete(key);
        const locationInfo = _this.getViewLocationInfo(_this.isPutView);
        _this.renderSmallView(locationInfo.width, locationInfo.height);
      }
      const _style = _this.isPutView.children[1].style;
      if (_style.display === 'none') {
        _style.display = 'flex';
        _this.isPutView.reEdit = true;
        event.stopPropagation();
      }
      console.log(divStyle.display);
    });

    this.renderer.appendChild(div, img);
    this.renderer.appendChild(div, this.getOptionsView(div, width, height, marginTop, marginLeft));
    this.renderer.appendChild(this.root.nativeElement, div);
    return div;
  }

  getMarginLeft(marginLeft: any): string {
    return Math.floor(marginLeft / this.columnValue) * this.columnValue + 'px';
  }

  getMarginTop(marginTop: any): string {
    return Math.floor(marginTop / this.rowValue) * this.rowValue + 'px';
  }

  getOptionsView(view: any, width: string, height: string, marginTop: string, marginLeft: string): ElementRef {
    const div = this.renderer.createElement('div');
    const confirmDiv = this.renderer.createElement('div');
    const confirmImg = this.renderer.createElement('img');
    const cancelDiv = this.renderer.createElement('div');
    const cancelImg = this.renderer.createElement('img');

    const divStyle = div.style;
    marginTop = Number(height.slice(0, -2)) - this.optionViewHeight + 'px';
    divStyle.width = width;
    divStyle.height = this.optionViewHeight + 'px';
    divStyle.marginTop = marginTop;
    divStyle.position = 'absolute';
    divStyle.display = 'flex';
    divStyle.flexDirection = 'row';
    divStyle.justifyContent = 'space-between';
    divStyle.alignItems = 'center';
    divStyle.backgroundColor = 'rgba(0, 0, 0, 0.5)';

    const confirmStyle = confirmDiv.style;
    confirmStyle.height = '100%';
    confirmStyle.width = '50%';
    confirmStyle.display = 'flex';
    confirmStyle.justifyContent = 'center';
    confirmStyle.alignItems = 'center';
    confirmImg.src = './assets/confirm.png';

    const cancelStyle = cancelDiv.style;
    cancelStyle.height = '100%';
    cancelStyle.width = '50%';
    cancelStyle.display = 'flex';
    cancelStyle.justifyContent = 'center';
    cancelStyle.alignItems = 'center';
    cancelImg.src = './assets/cancel.png';

    this.renderer.appendChild(cancelDiv, cancelImg);
    this.renderer.appendChild(confirmDiv, confirmImg);
    this.renderer.appendChild(div, cancelDiv);
    this.renderer.appendChild(div, confirmDiv);

    this.renderer.listen(cancelDiv, 'click', event => {
      event.stopPropagation();
      this.renderer.removeChild(view.parent, view);
      const key = this.isPutView.index;
      const isHas = this.hasPutViewContainer.has(key);
      if (isHas) {
        this.hasPutViewContainer.delete(key);
      }
      this.isPutView = null;
    });
    this.renderer.listen(confirmDiv, 'click', event => {
      event.stopPropagation();
      if (this.isPutView == null) {
        this.isPutView = this.hasPutViewContainer.get(view.index);
      }


      const isValid = this.checkViewLocation(this.isPutView);
      if (!isValid) {
        console.warn('位置无效，请重新设置');
        return;
      }

      // this.isPutView.children[1].style.display = 'none';

      this.saveView(this.isPutView);
      div.style.display = 'none';
      this.isPutView = null;
      if (this.selectedView != null) {
        this.selectedView.style.border = null;
        this.selectedView = null;
      }
    });
    return div;
  }


  saveView(view: any) {
    this.hasPutViewContainer.set(view.index, view);
    console.log('saveView: ' + this.hasPutViewContainer);
  }

  checkViewLocation(view: any): boolean {
    const viewLocations = this.getViewLocationInfo(view);

    let exist = false;
    this.hasPutViewContainer.forEach((value, key) => {
      if (view.index !== key && !exist) {
        const location = this.getViewLocationInfo(value);
        const topContains = viewLocations.top >= location.top && viewLocations.top < location.bottom;
        const bottomContains = viewLocations.bottom <= location.bottom && viewLocations.bottom > location.top;
        const leftContains = viewLocations.left >= location.left && viewLocations.left < location.right;
        const rightContains = viewLocations.right <= location.right && viewLocations.right > location.left;

        const leftOrRightContains = leftContains || rightContains;
        const topLeftContains = topContains && leftOrRightContains;
        const bottomAndLeftContains = bottomContains && leftOrRightContains;

        const rightAndLeftInner = viewLocations.right > location.right && viewLocations.left < location.left;
        const topAndBottomInner = viewLocations.top < location.top && viewLocations.bottom > location.bottom;
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

    const overLeft = viewLocations.right > this.rootWidth;
    const overBottom = viewLocations.bottom > this.rootHeight;
    return !(overLeft || overBottom || exist);
  }

  /**
   * 获取元素的 margin 值
   * @param view 元素
   * @returns {any} marginTop marginLeft
   */
  getViewLocationInfo(view: any): any {
    let margins: {};
    const style = view.style;
    const width = Number(style.width.slice(0, -2));
    const height = Number(style.height.slice(0, -2));
    const topLocation = Number(style.marginTop.slice(0, -2));
    const leftLocation = Number(style.marginLeft.slice(0, -2));
    const bottomLocation = Number(style.height.slice(0, -2)) + topLocation;
    const rightLocation = Number(style.width.slice(0, -2)) + leftLocation;
    margins = {
      width: width,
      height: height,
      top: topLocation,
      left: leftLocation,
      bottom: bottomLocation,
      right: rightLocation
    };
    return margins;
  }

}
