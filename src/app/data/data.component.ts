import {Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit, AfterViewInit {


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
  currentIndex = '2';

  @ViewChild('myinput')
  input: HTMLInputElement;

  private _inputValue: string;

  @Input()
  // set get 必须共存，可以用于处理传递过来的值，非空判断，逻辑处理等
  set inputValue(inputValue: string) {
    this._inputValue = (inputValue && inputValue.trim()) || 'no inputValue set';
  }

  get inputValue(): string {
    return this._inputValue;
  }

  @Output() outputValue = new EventEmitter<string>();


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

  ngAfterViewInit(): void {
    console.log(this.input);
    console.log('input：' + this.inputValue);
  }

  onClick(name: string) {
    console.log(event.type);
    this.outputValue.emit(name);
  }
}
