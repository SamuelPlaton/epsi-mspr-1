import supertest from 'supertest';
import assert from 'assert';
import { app } from '../../../index.js';

export default () => describe('GET', function (){
    describe('/stores', function (){
        it('retrieve stores', function(done) {
            supertest(app)
                .get('/stores')
                .expect(200, done);
        });
    })
    describe('/stores/:id', function (){
            it('retrieve store', function(done) {
                supertest(app)
                    .get('/stores/1')
                    .then(response => {
                        assert(response.body[0]['name'], true)
                        done();
                    })
                    .catch(err => done(err))
            });
    });
    describe('/stores/selected', function (){
        it('retrieve selected stores', function(done) {
            supertest(app)
                .get('/stores/selected?ids=1,2')
                .then(response => {
                    assert(response.body.length, 3)
                    done();
                })
                .catch(err => done(err))
        });
    })
})
