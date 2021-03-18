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
        describe('should return user', function (){
            it('responds with param', function(done) {
                supertest(app)
                    .get('/users/1')
                    .then(response => {
                        assert(response.body.user.email, 'john.doe2@supertest.com')
                        done();
                    })
                    .catch(err => done(err))
            });
        })
    })


})
