import { default as getCoupons } from './get.test.js';
import { default as postCoupons } from './post.test.js';
import { default as putCoupons } from './put.test.js';

describe('COUPONS', function (){
    getCoupons();
    postCoupons();
    putCoupons();
});