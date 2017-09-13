import {Component, Injectable, Inject} from '@angular/core';
import {APP_CONFIG, HERO_DI_CONFIG} from './app-config';

@Injectable()
export class Logger {
  logs: string[] = []; // capture logs for testing

  log(message: string) {
    this.logs.push(message);
    console.log('Logger', message);
  }
}

@Injectable()
export class OldLogger extends Logger {

  logs: string[] = []; // capture logs for testing

  log(message: string) {
    this.logs.push(message);
    console.log('OldLogger', message);
  }

}

@Injectable()
export class NewLogger extends Logger {

  logs: string[] = []; // capture logs for testing

  log(message: string) {
    this.logs.push(message);
    console.log('NewLogger', message);
  }

}

export const silentLogger = {
  logs: ['Silent logger says "Shhhhh!". Provided via "useValue"'],
  log: () => {
    console.log('silentLogger');
  }
};

@Component({
  selector: 'app-providers',
  template: `template`,
  providers:
    [
      {provide: Logger, useClass: NewLogger},
      {provide: OldLogger, useExisting: Logger},
      {provide: Logger, useValue: silentLogger},
    ]
})

export class ProvidersComponent {
  log: string;

  constructor(logger: Logger) {
    logger.log('Hello from NewLogger');
    this.log = logger.logs[0];
  }
}


