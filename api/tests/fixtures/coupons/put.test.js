import supertest from 'supertest';
import assert from 'assert';
import { app } from '../../../index.js';

export default () => describe('PUT', function (){
    describe('/coupons', function (){
        it('bad parameters', function(done) {
            supertest(app)
                .put('/coupons')
                .send({})
                .expect('-1', done);
        });
        it('wrong credentials', function(done) {
            supertest(app)
                .put('/coupons')
                .send({ data: {
                        userId: '1',
                        userToken: '2',
                        userCouponId: '1supertest',
                        couponId: '1supertest',
                        favored: 1,
                        used: 1,
                        action: "use"
                    }})
                .expect('-2', done);
        });
        it('user_coupon modified', function(done) {
            supertest(app)
                .put('/coupons')
                .send({ data: {
                        userId: '1',
                        userToken: '1',
                        userCouponId: '4supertest',
                        couponId: '4supertest',
                        favored: 1,
                        used: 1,
                        action: "use"
                    }})
                .expect(201, done);
        });
        it('use invalid coupon', function(done) {
            supertest(app)
                .put('/coupons')
                .send({ data: {
                        userId: '1',
                        userToken: '1',
                        userCouponId: '3supertest',
                        couponId: '3supertest',
                        favored: 1,
                        used: 1,
                        action: "use"
                    }})
                .expect('-10', done);
        });
        it('user_coupon already used', function(done) {
            supertest(app)
                .put('/coupons')
                .send({ data: {
                        userId: '1',
                        userToken: '1',
                        userCouponId: '5supertest',
                        couponId: '5supertest',
                        favored: 1,
                        used: 2,
                        action: "use"
                    }})
                .expect('-13', done);
        });
    });
});
