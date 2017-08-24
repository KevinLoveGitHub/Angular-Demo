import {Result} from './beans/Result';
import {Gank} from './beans/Gank';

const gank1 = new Gank('https://ws1.sinaimg.cn/large/610dc034ly1fitcjyruajj20u011h412.jpg', '福利');
const gank2 = new Gank('https://ws1.sinaimg.cn/large/610dc034ly1fis7dvesn6j20u00u0jt4.jpg', '福利');
const gank3 = new Gank('https://ws1.sinaimg.cn/large/610dc034ly1fil82i7zsmj20u011hwja.jpg', '福利');
const gank4 = new Gank('https://ws1.sinaimg.cn/large/610dc034ly1fik2q1k3noj20u00u07wh.jpg', '福利');
const gank5 = new Gank('https://ws1.sinaimg.cn/large/610dc034ly1fir1jbpod5j20ip0newh3.jpg', '福利');
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
