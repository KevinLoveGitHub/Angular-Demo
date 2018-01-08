import {Component, OnInit, Renderer2, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @ViewChild('root')
  root: ElementRef;

  row = new Array(34);
  column = new Array(12);
  selectedView: any;

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit() {
  }


  selectView(view: any, event: any) {
    this.selectedView = view;
    this.selectedView.style.border = 'aqua solid 10px';
    console.log(view);

    // const div = this.renderer.createElement('div');
    // const text = this.renderer.createText('Hello world!');
    // this.renderer.setStyle(
    //   div,
    //   'border-left',
    //   '2px dashed olive'
    // );
    //
    // this.renderer.setStyle(
    //   div,
    //   'font-size',
    //   '5em'
    // );
    //
    // const img = this.renderer.createElement('img');
    // this.renderer.setAttribute(img, 'src', 'assets/clock.jpg');
    //
    //
    // this.renderer.appendChild(div, img);
    // this.renderer.appendChild(div, text);
    // this.renderer.appendChild(this.el.nativeElement, div);
  }

  putView(event: any) {
    if (this.selectedView == null) {
      return;
    }
    const style = this.selectedView.style;
    const srcUrl = this.selectedView.currentSrc;
    const marginLeft = event.layerX;
    const marginTop = event.layerY;

    const width = Number(style.width.slice(0, -2)) * 2 + 'px';
    const height = Number(style.height.slice(0, -2)) * 2 + 'px';
    const view = this.createView(this.selectedView, marginLeft, marginTop);
    console.log(this.selectedView);
  }

  createView(view: any, marginLeft: number, marginTop: number): ElementRef {
    const srcUrl = view.currentSrc;
    const style = view.style;
    const width = Number(style.width.slice(0, -2)) * 2 + 'px';
    const height = Number(style.height.slice(0, -2)) * 2 + 'px';

    const div = this.renderer.createElement('div');
    const img = this.renderer.createElement('img');
    this.renderer.setAttribute(img, 'src', srcUrl);
    this.renderer.setStyle(
      img, 'width', width
    );
    this.renderer.setStyle(
      img, 'height', height
    );
    this.renderer.setStyle(
      img, 'margin-left', marginLeft + 110 + 'px'
    );
    this.renderer.setStyle(
      img, 'margin-top', marginTop + 'px'
    );

    this.renderer.setStyle(
      img, 'position', 'absolute'
    );

    this.renderer.appendChild(div, img);
    this.renderer.appendChild(this.root.nativeElement, div);
    return div;
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

  createGuide(parentView: any, width: string, height: string) {
    const viewWidth = Number(width.slice(0, -2));
    const viewHeight = Number(height.slice(0, -2));
    const topDiv = this.renderer.createElement('div');
    const top = this.renderer.createElement('img');
    this.renderer.appendChild(topDiv, top);
    this.renderer.setAttribute(top, 'src', 'assets/top.png');
    this.renderer.setStyle(
      topDiv, 'position', 'absolute'
    );
    this.renderer.setStyle(
      top, 'width', viewWidth / 3 + 'px'
    );
    this.renderer.setStyle(
      top, 'height', viewHeight / 3 + 'px'
    );

    this.renderer.setStyle(
      top, 'margin-left', (viewWidth - viewWidth / 3) / 2 + 'px'
    );

    const bottomDiv = this.renderer.createElement('div');
    const bottom = this.renderer.createElement('img');
    this.renderer.setAttribute(bottom, 'src', 'assets/bottom.png');

    this.renderer.appendChild(bottomDiv, bottom);
    this.renderer.setStyle(
      bottomDiv, 'position', 'absolute'
    );
    this.renderer.setStyle(
      bottom, 'width', viewWidth / 3 + 'px'
    );
    this.renderer.setStyle(
      bottom, 'height', viewHeight / 3 + 'px'
    );

    this.renderer.setStyle(
      bottom, 'margin-top', (viewHeight - viewHeight / 3) + 'px'
    );

    this.renderer.setStyle(
      bottom, 'margin-left', (viewWidth - viewWidth / 3) / 2 + 'px'
    );

    const leftDiv = this.renderer.createElement('div');
    const left = this.renderer.createText('左');
    this.renderer.appendChild(leftDiv, left);

    const rightDiv = this.renderer.createElement('div');
    const right = this.renderer.createText('右');
    this.renderer.appendChild(rightDiv, right);

    this.renderer.appendChild(parentView, topDiv);
    this.renderer.appendChild(parentView, bottomDiv);
  }

}
