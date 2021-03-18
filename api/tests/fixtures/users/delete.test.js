import request from 'supertest';
import {app} from '../../../index.js';

export default () => describe('DELETE', function () {
    describe('/users', function () {
        it('bad credentials', function (done) {
            request(app).delete('/users/3').send({data: {token: 'X'}}).expect(403, done);
        });
        it('delete user', function (done) {
            request(app).delete('/users/3').send({data: {token: '3'}}).expect(204, done);
        });
        it('bad parameters', function (done) {
            request(app).delete('/users/3').send({}).expect(400, done);
        });
    });
})