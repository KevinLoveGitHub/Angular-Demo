import {Injectable} from '@angular/core';
import {Result} from './beans/Result';
import {RESULTS} from './mock-ganks';

// 当 TypeScript 看到@Injectable()装饰器时，就会记下本服务的元数据。 如果 Angular 需要往这个服务中注入其它依赖，就会使用这些元数据
@Injectable()
export class GankService {
  static getGanks(): Result {
    return RESULTS;
  }

  getHeroesSlowly(): Promise<Result> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(GankService.getGanks()), 2000);
    });
  }
}
