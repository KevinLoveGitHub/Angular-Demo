import {Directive, ElementRef, Input, HostListener} from '@angular/core';

@Directive({
  selector: '[appMyClick]'
})

export class ClickDirective {

  @Input('appMyClick')
  name: string;

  constructor() {
  }

  @HostListener('click')
  onClick() {
    console.log('myClick：' + this.name);
  }
}
