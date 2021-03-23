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
                        userCouponId: '1supertest',
                        couponId: '1supertest',
                        favored: 1,
                        used: 1,
                        action: "use"
                    }})
                .expect(201, done);
        });
    });
});
