import sails from 'sails';
import {sqlInstance} from "../index.js";
import cryptoJS from "crypto-js";

// Before running any tests...
before(function (done) {

    // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
    this.timeout(10000);

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

        const future = '2030-04-08 00:00:00';
        const past = '2021-02-08 00:00:00';
        // Create 3 users
        sqlInstance.request('INSERT INTO USER(ID, FIRSTNAME, LASTNAME, EMAIL, TOKEN, BIRTHDAY) VALUES(?, ?, ?, ?, ?, ?)',
            ['1', 'John', 'Doe', 'john.doe2@supertest.com', '1', '2000-03-08 00:00:00']);
        const token = cryptoJS.AES.encrypt('12345', '22787802-a6e7-4c3d-8fc1-aab0ece1cb41').toString(); // U2FsdGVkX19kotqohmawJBsCw0g0uDipZtdtYCYb8N8=
        sqlInstance.request('INSERT INTO USER(ID, FIRSTNAME, LASTNAME, EMAIL, TOKEN, BIRTHDAY) VALUES(?, ?, ?, ?, ?, ?)',
            ['2', 'John', 'Doe', 'john.doe3@supertest.com', token, '2000-03-08 00:00:00']);
        sqlInstance.request('INSERT INTO USER(ID, FIRSTNAME, LASTNAME, EMAIL, TOKEN, BIRTHDAY) VALUES(?, ?, ?, ?, ?, ?)',
            ['3', 'John', 'Doe', 'john.doe4@supertest.com', '3', '2000-03-08 00:00:00']);

        // Create our store
        sqlInstance.request('INSERT INTO STORE(ID, LOCALIZATION, NAME) VALUES(?, ?, ?)',
            ['1supertest', '0', 'supertest_store']);
        // Create a unique and valid coupon
        sqlInstance.request('INSERT INTO COUPON(ID, START, END, OFFER, DESCRIPTION, MAX_LIMIT, `UNIQUE`, CODE, TITLE, `VALID`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                '1supertest',
                past,
                future,
                '-50%',
                'Description',
                500,
                1,
                'SUPERTEST1',
                'Title',
                1
            ]);
        // Create a non unique and valid coupon
        sqlInstance.request('INSERT INTO COUPON(ID, START, END, OFFER, DESCRIPTION, MAX_LIMIT, `UNIQUE`, CODE, TITLE, `VALID`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                '2supertest',
                past,
                future,
                '-50%',
                'Description',
                500,
                0,
                'SUPERTEST2',
                'Title',
                1
            ]);
        // Create a invalid coupon
        sqlInstance.request('INSERT INTO COUPON(ID, START, END, OFFER, DESCRIPTION, MAX_LIMIT, `UNIQUE`, CODE, TITLE, `VALID`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                '3supertest',
                past,
                future,
                '-50%',
                'Description',
                500,
                1,
                'SUPERTEST3',
                'Title',
                0
            ]);
        // Create a non unique and valid coupon
        sqlInstance.request('INSERT INTO COUPON(ID, START, END, OFFER, DESCRIPTION, MAX_LIMIT, `UNIQUE`, CODE, TITLE, `VALID`) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                '4supertest',
                past,
                future,
                '-50%',
                'Description',
                500,
                0,
                'SUPERTEST4',
                'Title',
                1
            ]);
        // Create affiliations
        sqlInstance.request('INSERT INTO COUPON_STORE(COUPON, STORE) VALUES(?, ?)',
            ['1supertest', '1supertest']);
        sqlInstance.request('INSERT INTO COUPON_STORE(COUPON, STORE) VALUES(?, ?)',
            ['2supertest', '1supertest']);
        sqlInstance.request('INSERT INTO USER_COUPON(ID, USER, COUPON, USED, FAVORED) VALUES(?, ?, ?, ?, ?)',
            ['1supertest', '1', '1supertest', '1', '1']);
        sqlInstance.request('INSERT INTO USER_COUPON(ID, USER, COUPON, USED, FAVORED) VALUES(?, ?, ?, ?, ?)',
            ['4supertest', '1', '4supertest', '0', '1']);
       sqlInstance.request('INSERT INTO USER_STORE(USER, STORE) VALUES(?, ?)',
            ['1', '1supertest']);
        return done();
    });
});

// After all tests have finished...
after(async function () {
    const userId = await sqlInstance.request('SELECT id FROM USER WHERE EMAIL = ?', ['john.doe@supertest.com']).then(res => res[0]['id']);
    // Clean our fixtures
    await sqlInstance.request('DELETE FROM COUPON_STORE WHERE STORE IN ("1supertest")');
    await sqlInstance.request('DELETE FROM USER_STORE WHERE USER IN ("1","2","3",?)', [userId]);
    await sqlInstance.request('DELETE FROM USER_COUPON WHERE USER IN ("1","2","3")');
    await sqlInstance.request('DELETE FROM USER WHERE ID IN ("1","2","3",?)', [userId]);
    await sqlInstance.request('DELETE FROM STORE WHERE ID = "1supertest"');
    await sqlInstance.request('DELETE FROM COUPON WHERE ID IN ("1supertest","2supertest","3supertest","4supertest")');

    sails.lower();

});
