import {Injectable} from '@angular/core';
import {Result} from './beans/Result';
import {RESULTS} from './mock-ganks';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Gank} from './beans/Gank';

// 当 TypeScript 看到@Injectable()装饰器时，就会记下本服务的元数据。 如果 Angular 需要往这个服务中注入其它依赖，就会使用这些元数据
@Injectable()
export class GankService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private resultUrl = 'http://gank.io/api/data/%E7%A6%8F%E5%88%A9';
  detail: Gank;

  constructor(private http: Http) {
  }

  static getGanks(): Result {
    return RESULTS;
  }

  getHeroesSlowly(): Promise<Result> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(GankService.getGanks()), 2000);
    });
  }

  getResult(pageSize: number, page: number): Promise<Result> {
    const url = this.resultUrl + '/' + pageSize + '/' + page;
    // const url = 'http://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/1';
    return this.http.get(url)
      .map(function (result) {
        console.log(result.json());
        return result;
      })
      .toPromise()
      .then(response => response.json() as Result)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
