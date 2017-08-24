import {Result} from './beans/Result';
import {Gank} from './beans/Gank';

const gank1 = new Gank('https://ws1.sinaimg.cn/large/610dc034ly1fitcjyruajj20u011h412.jpg');
const gank2 = new Gank('https://ws1.sinaimg.cn/large/610dc034ly1fis7dvesn6j20u00u0jt4.jpg');
const gank3 = new Gank('https://ws1.sinaimg.cn/large/610dc034ly1fil82i7zsmj20u011hwja.jpg');
const gank4 = new Gank('https://ws1.sinaimg.cn/large/610dc034ly1fik2q1k3noj20u00u07wh.jpg');
const gank5 = new Gank('https://ws1.sinaimg.cn/large/610dc034ly1fir1jbpod5j20ip0newh3.jpg');
export const RESULTS: Result = {
  error: 'null',
  results: [
    gank1,
    gank2,
    gank3,
    gank4,
    gank5
  ]
};
