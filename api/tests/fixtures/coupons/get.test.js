import supertest from 'supertest';
import assert from 'assert';
import { app } from '../../../index.js';

export default () => describe('GET', function (){
    describe('/coupons/:id', function (){
        it('retrieve coupon and includes', function(done) {
            supertest(app)
                .get('/coupons/1supertest?stores=true&user=1&token=1')
                .then(response => {
                assert(response.body.coupon[0]['id'] === '1supertest', done);
                assert(response.body.stores.length === 1, done);
                assert(response.body.userCoupons.length === 0, done);
                assert(response.body.historiqueCoupons.length === 0, done);
                done();
            }).catch(err => done(err))
        });
    })
    describe('/coupons/code/:code', function (){
        it('retrieve coupon by its code', function(done) {
            supertest(app)
                .get('/coupons/code/SUPERTEST1')
                .then(response => {
                    assert(response.body[0]['code'] === 'SUPERTEST1', done);
                    done();
                })
                .catch(err => done(err))
        });
    });
    describe('/coupons', function (){
        it('retrieve selected coupons', function(done) {
            supertest(app)
                .get('/coupons?ids=1supertest')
                .then(response => {
                    assert(response.body.length, 0)
                    done();
                })
                .catch(err => done(err))
        });
        it('bad parameters', function(done) {
            supertest(app)
                .get('/coupons').expect(400, done)
        });
    })
})
