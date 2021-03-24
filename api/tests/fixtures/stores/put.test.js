import request from 'supertest';
import {app} from '../../../index.js';

export default () => describe('PUT', function () {
    describe('/stores', function () {
        it('add users_stores', function (done) {
            request(app)
                .put('/stores')
                .send({ data: {
                        userId: "1",
                        userToken: "1",
                        stores: ["1supertest"]
                    }
                })
                .expect(200,done)
        });
        it('bad parameters', function (done) {
            request(app)
                .put('/stores')
                .send({})
                .expect(400,done)
        });
        it('wrong token', function (done) {
            request(app)
                .put('/stores')
                .send({ data: {
                        userId: "1",
                        userToken: "2",
                        stores: ["1supertest"]
                    }
                })
                .expect(403,done)
        });
    });
})
