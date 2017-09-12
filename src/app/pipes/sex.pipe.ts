import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'mySex'})
export class SexPipe implements PipeTransform {
  transform(value: number): string {
    console.log(value);
    if (value === 1) {
      return '男';
    } else {
      return '女';
    }
  }
}
