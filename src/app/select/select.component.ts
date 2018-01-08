import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  row = new Array(34);
  column = new Array(12);

  constructor() {
  }

  ngOnInit() {
  }


  selectView(view: any, event: any) {
    event.target.style.border = 'aqua solid 10px';
    console.log(view);

  }

  putView( event: any) {
  }

}
