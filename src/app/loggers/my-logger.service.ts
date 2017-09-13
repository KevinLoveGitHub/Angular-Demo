import { Injectable, InjectionToken} from '@angular/core';


export const LOG = new InjectionToken<string>('log');

@Injectable()
export class MyLoggerService {
  logs: string[] = []; // capture logs for testing

  log(message: string) {
    this.logs.push(message);
    console.log('MyLoggerService', message);
  }

}
