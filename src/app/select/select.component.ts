import {Component, OnInit, Renderer2, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

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
  viewContainer: Map<number, any>;
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
    this.viewContainer = new Map<number, any>();
    this.createIndex = 0;
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
    console.log(this.selectedView);
  }

  putView(event: any) {
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

  moveView(view: any, marginLeft: any, marginTop: any) {
    marginLeft = this.getMarginLeft(marginLeft);
    marginTop = this.getMarginTop(marginTop);
    view.style.marginLeft = marginLeft;
    view.style.marginTop = marginTop;
  }

  createView(selectedView: any, marginLeft: any, marginTop: any): ElementRef {
    const srcUrl = selectedView.currentSrc;
    const style = selectedView.style;
    const view = this.views.find(v => v.id === selectedView.id);
    const width = view.width * this.zoom + 'px';
    const height = view.height * this.zoom + 'px';

    // const width = Number(style.width.slice(0, -2)) * 4.5 + 'px';
    // const height = Number(style.height.slice(0, -2)) * 4.5 + 'px';
    // const leftRemainder = marginLeft % 50;
    // marginLeft = marginLeft - leftRemainder;

    marginLeft = this.getMarginLeft(marginLeft);


    // const topRemainder = marginTop % 62;
    // marginTop = marginTop - topRemainder;

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

    const _this = this;
    // 设置click事件
    this.renderer.listen(div, 'click', function (event) {
      _this.isPutView = event.currentTarget;
      const _style = _this.isPutView.children[1].style;
      if (_style.display === 'none') {
        _style.display = 'flex';
      }
      console.log(divStyle.display);
    });

    this.renderer.appendChild(div, img);
    this.renderer.appendChild(div, this.getOptionsView(div, width, height, marginTop, marginLeft));
    this.renderer.appendChild(this.root.nativeElement, div);
    return div;
  }

  getMarginLeft(marginLeft: any): string {
    const leftRemainder = marginLeft % 90;
    marginLeft = marginLeft - leftRemainder;
    return marginLeft + 150 + 'px';
  }

  getMarginTop(marginTop: any): string {
    const topRemainder = marginTop % 90;
    marginTop = marginTop - topRemainder;
    return marginTop + 'px';
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
      const isHas = this.viewContainer.has(key);
      if (isHas) {
        this.viewContainer.delete(key);
      }
      this.isPutView = null;
    });
    this.renderer.listen(confirmDiv, 'click', event => {
      event.stopPropagation();
      if (this.isPutView == null) {
        this.isPutView = this.viewContainer.get(view.index);
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
    this.viewContainer.set(view.index, view);
    console.log('saveView: ' + this.viewContainer);
  }

  checkViewLocation(view: any): boolean {
    const viewLocations = this.getViewLocationInfo(view);

    let exist = false;
    this.viewContainer.forEach((value, key) => {
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

    const overLeft = viewLocations.right > this.rootWidth + this.rootMarginLeft;
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
    const topLocation = Number(style.marginTop.slice(0, -2));
    const leftLocation = Number(style.marginLeft.slice(0, -2));
    const bottomLocation = Number(style.height.slice(0, -2)) + topLocation;
    const rightLocation = Number(style.width.slice(0, -2)) + leftLocation;
    margins = {
      top: topLocation,
      left: leftLocation,
      bottom: bottomLocation,
      right: rightLocation
    };
    return margins;
  }


  // createView(width: string, height: string, srcUrl: string) {
  //   const div = this.renderer.createElement('div');
  //   const img = this.renderer.createElement('img');
  //   this.renderer.setAttribute(img, 'src', srcUrl);
  //   this.renderer.setStyle(
  //     img, 'width', width
  //   );
  //   this.renderer.setStyle(
  //     img, 'height', height
  //   );
  //   this.renderer.setStyle(
  //     div, 'margin-left', '110px'
  //   );
  //
  //   this.renderer.setStyle(
  //     img, 'position', 'absolute'
  //   );
  //   const topDiv = this.renderer.createElement('div');
  //   const top = this.renderer.createElement('img');
  //   this.renderer.appendChild(topDiv, top);
  //   this.renderer.setAttribute(top, 'src', 'assets/top.png');
  //   this.renderer.setStyle(
  //     topDiv, 'position', 'absolute'
  //   );
  //   this.renderer.setStyle(
  //     top, 'width', Number(width.slice(0, -2)) / 2 + 'px'
  //   );
  //   this.renderer.setStyle(
  //     top, 'height', Number(height.slice(0, -2)) / 2 + 'px'
  //   );
  //
  //   const bottomDiv = this.renderer.createElement('div');
  //   const bottom = this.renderer.createText('下');
  //   this.renderer.appendChild(bottomDiv, bottom);
  //
  //   const leftDiv = this.renderer.createElement('div');
  //   const left = this.renderer.createText('左');
  //   this.renderer.appendChild(leftDiv, left);
  //
  //   const rightDiv = this.renderer.createElement('div');
  //   const right = this.renderer.createText('右');
  //   this.renderer.appendChild(rightDiv, right);
  //
  //
  //   this.renderer.appendChild(div, img);
  //   this.renderer.appendChild(this.root.nativeElement, div);
  // }

  // createGuide(parentView: any, width: string, height: string) {
  //   const viewWidth = Number(width.slice(0, -2));
  //   const viewHeight = Number(height.slice(0, -2));
  //   const topDiv = this.renderer.createElement('div');
  //   const top = this.renderer.createElement('img');
  //   this.renderer.appendChild(topDiv, top);
  //   this.renderer.setAttribute(top, 'src', 'assets/top.png');
  //   this.renderer.setStyle(
  //     topDiv, 'position', 'absolute'
  //   );
  //   this.renderer.setStyle(
  //     top, 'width', viewWidth / 3 + 'px'
  //   );
  //   this.renderer.setStyle(
  //     top, 'height', viewHeight / 3 + 'px'
  //   );
  //
  //   this.renderer.setStyle(
  //     top, 'margin-left', (viewWidth - viewWidth / 3) / 2 + 'px'
  //   );
  //
  //   const bottomDiv = this.renderer.createElement('div');
  //   const bottom = this.renderer.createElement('img');
  //   this.renderer.setAttribute(bottom, 'src', 'assets/bottom.png');
  //
  //   this.renderer.appendChild(bottomDiv, bottom);
  //   this.renderer.setStyle(
  //     bottomDiv, 'position', 'absolute'
  //   );
  //   this.renderer.setStyle(
  //     bottom, 'width', viewWidth / 3 + 'px'
  //   );
  //   this.renderer.setStyle(
  //     bottom, 'height', viewHeight / 3 + 'px'
  //   );
  //
  //   this.renderer.setStyle(
  //     bottom, 'margin-top', (viewHeight - viewHeight / 3) + 'px'
  //   );
  //
  //   this.renderer.setStyle(
  //     bottom, 'margin-left', (viewWidth - viewWidth / 3) / 2 + 'px'
  //   );
  //
  //   const leftDiv = this.renderer.createElement('div');
  //   const left = this.renderer.createText('左');
  //   this.renderer.appendChild(leftDiv, left);
  //
  //   const rightDiv = this.renderer.createElement('div');
  //   const right = this.renderer.createText('右');
  //   this.renderer.appendChild(rightDiv, right);
  //
  //   this.renderer.appendChild(parentView, topDiv);
  //   this.renderer.appendChild(parentView, bottomDiv);
  // }


}
