import sails from 'sails';
import {sqlInstance} from "../index.js";
import cryptoJS from "crypto-js";

// Before running any tests...
before(function (done) {

    // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
    this.timeout(5000);

    sails.lift({
        // Your Sails app's configuration files will be loaded automatically,
        // but you can also specify any other special overrides here for testing purposes.

        // For example, we might want to skip the Grunt hook,
        // and disable all logs except errors and warnings:
        hooks: {grunt: false},
        log: {level: 'warn'},

    }, function (err) {
        if (err) {
            return done(err);
        }

        const now = new Date();
        // Load our fixtures
        sqlInstance.request('INSERT INTO USER(ID, FIRSTNAME, LASTNAME, EMAIL, TOKEN, BIRTHDAY) VALUES(?, ?, ?, ?, ?, ?)',
            ['1', 'John', 'Doe', 'john.doe2@supertest.com', '1', now]);
        const token = cryptoJS.AES.encrypt('12345', '22787802-a6e7-4c3d-8fc1-aab0ece1cb41').toString(); // U2FsdGVkX1+ODxnFHJw5uwmkxt7V/5cTnCFvbVjCqQM=
        sqlInstance.request('INSERT INTO USER(ID, FIRSTNAME, LASTNAME, EMAIL, TOKEN, BIRTHDAY) VALUES(?, ?, ?, ?, ?, ?)',
            ['2', 'John', 'Doe', 'john.doe3@supertest.com', token, now]);
        sqlInstance.request('INSERT INTO USER(ID, FIRSTNAME, LASTNAME, EMAIL, TOKEN, BIRTHDAY) VALUES(?, ?, ?, ?, ?, ?)',
            ['3', 'John', 'Doe', 'john.doe4@supertest.com', '3', now]);

        const future = now;
        future.setDate(future.getDate()+5);
        sqlInstance.request('INSERT INTO COUPON(ID, START, END, OFFER, DESCRIPTION, MAX_LIMIT, `UNIQUE`, CODE, TITLE, `VALID`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                '1supertest',
                now,
                future,
                '-50%',
                'Description',
                500,
                1,
                'SUPERTEST1',
                'Title',
                1
            ]);
        sqlInstance.request('INSERT INTO COUPON_STORE(COUPON, STORE) VALUES(?, ?)',
            ['1supertest', '1']);
        return done();
    });
});

// After all tests have finished...
after(function (done) {
    // Clean our fixtures
    sqlInstance.request('DELETE FROM USER_STORE WHERE USER = 1').then(done);
    sqlInstance.request('DELETE FROM COUPON_STORE WHERE COUPON = "1supertest"').then(done);
    sqlInstance.request('DELETE FROM USER WHERE ID IN (1,2,3)').then(done);
    sqlInstance.request('DELETE FROM USER WHERE EMAIL = "john.doe4@supertest.com"').then(done);
    sqlInstance.request('DELETE FROM COUPON WHERE ID IN (1supertest)').then(done);
    sails.lower(done);

});
