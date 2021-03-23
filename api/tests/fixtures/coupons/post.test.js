import supertest from 'supertest';
import assert from 'assert';
import { app } from '../../../index.js';

export default () => describe('POST', function (){
    describe('/coupons', function (){
        it('bad parameters', function(done) {
            supertest(app)
                .post('/coupons')
                .send({})
                .expect('-1', done);
        });
        it('wrong credentials', function(done) {
            supertest(app)
                .post('/coupons')
                .send({ data: {
                        userId: '1',
                        userToken: '2',
                        couponId: '1supertest'
                    }})
                .expect('-2', done);
        });
        it('invalid coupon', function(done) {
            supertest(app)
                .post('/coupons')
                .send({ data: {
                        userId: '1',
                        userToken: '1',
                        couponId: '3supertest'
                    }})
                .expect('-10', done);
        });
        it('user_coupon already exist', function(done) {
            supertest(app)
                .post('/coupons')
                .send({ data: {
                        userId: '1',
                        userToken: '1',
                        couponId: '4supertest'
                    }})
                .expect('-11', done);
        });
        it('user_coupon created', function(done) {
            supertest(app)
                .post('/coupons')
                .send({ data: {
                        userId: '1',
                        userToken: '1',
                        couponId: '2supertest'
                    }})
                .expect(201, done);
        });
    });
});
