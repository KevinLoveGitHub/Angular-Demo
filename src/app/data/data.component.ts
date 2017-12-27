import {Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter, Inject} from '@angular/core';
import {Logger, OldLogger} from '../providers.component';
import {LOG, MyLoggerService} from '../loggers/my-logger.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
  providers: [
    {provide: LOG, useClass: MyLoggerService}
  ]
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
  sex = 1;

  @ViewChild('myinput')
  input: HTMLInputElement;

  private _inputValue: string;
  images: [
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg',
    'http://ww1.sinaimg.cn/large/610dc034ly1fjaxhky81vj20u00u0ta1.jpg'
    ];

  @Input()
  // set get 必须共存，可以用于处理传递过来的值，非空判断，逻辑处理等
  set inputValue(inputValue: string) {
    this._inputValue = (inputValue && inputValue.trim()) || 'no inputValue set';
  }

  get inputValue(): string {
    return this._inputValue;
  }

  @Output() outputValue = new EventEmitter<string>();


  constructor(private log: Logger, private oldLog: OldLogger, @Inject(LOG) myLog: MyLoggerService) {
    log.log('DataComponent');
    oldLog.log('DataComponent');
    myLog.log('DataComponent');
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
