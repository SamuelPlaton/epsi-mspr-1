import supertest from 'supertest';
import assert from 'assert';
import { app } from '../../../index.js';

export default () => describe('GET', function (){
    describe('/users', function (){
            it('responds with bad param', function(done) {
                supertest(app)
                    .get('/users')
                    .expect(400, done);
            });
        it('responds with users', function(done) {
            supertest(app)
                .get('/users?ids=1,2')
                .expect(200, done);
        });
    })
    describe('/users/:id', function (){
        describe('should return user and his inclusions', function (){
            it('responds with param', function(done) {
                supertest(app)
                    .get('/users/1?stores=true&coupons=true')
                    .then(response => {
                        assert(response.body.user.email, 'john.doe2@supertest.com');
                        assert(response.body.stores.length, 1);
                        assert(response.body.coupons.length, 1);
                        done();
                    })
                    .catch(err => done(err))
            });
        })
    })


})
