import {Gank} from './Gank';

export class Result {
  error: String;
  results: Array<Gank>;

  constructor(error: string, results: Array<Gank>) {
    this.error = error;
    this.results = results;
  }
}
