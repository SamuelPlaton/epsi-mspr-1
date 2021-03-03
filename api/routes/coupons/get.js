import express from 'express';
import { sqlInstance } from '../../index.js';

export const routes = express.Router();
// Method get of data of a coupon
/**
 * @swagger
 *
 * /coupons/{id}:
 *   get:
 *     tags:
 *       - coupons
 *     produces:
 *       - application/json
 *     summary:
 *       - Get all data from a coupon
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            stores:
 *              type: string
 *            users:
 *              type: string
 *            example:
 *              stores: true
 *              coupons: true
 *     responses:
 *      '200':
 *        description: Coupon data is retrieved
 *
 *
 */
routes.get('/coupons/:id', (request, response) => {
    // Retrieve our Coupons, his users and stores affiliated
    const includes = request.query;
    // Setup our default query and param
    const query = ['SELECT * FROM COUPON C WHERE C.ID = ?'];
    const queryParams = [request.params.id];
    // Our queries index result
    const idx = [0, null, null];
    let acc = 0;
    // Everytime an include is settled, we increment the index result
    if(includes){
        if(includes.stores){
            query.push('SELECT * FROM COUPON_STORE CS WHERE CS.COUPON = ?');
            queryParams.push(request.params.id);
            acc += 1;
            idx[1] = acc;
        }
        if(includes.users){
            query.push('SELECT * FROM USER_COUPON UC WHERE UC.COUPON = ?');
            queryParams.push(request.params.id);
            acc += 1;
            idx[2] = acc;
        }
    }
    // Set our final query
    sqlInstance.request(query.join(';'), queryParams).then(result => {
        response.send({
            coupon: result[idx[0]],
            stores : result[idx[1]],
            users: result[idx[2]],
        });
    });
});

// Method GET of all selected coupons data
/**
 * @swagger
 *
 * /coupons:
 *   get:
 *     tags:
 *       - coupons
 *     produces:
 *       - application/json
 *     summary:
 *       - Get a list of coupons from the database
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              ids:
 *                type: array
 *            example:
 *              ids: [1, 2, 3]
 *
 *     responses:
 *      '200':
 *        description: Array of coupons
 *      '400':
 *        description: Bad parameters
 *
 *
 */
routes.get('/coupons', (request, response) => {
    const {ids} = request.query;
    if (!ids) {
        response.send('Bad parameters');
        response.status(400).end();
        return;
    }
    sqlInstance.request('SELECT * FROM COUPON WHERE ID IN (?)', [ids.split(',')]).then(result => {
        response.send(result);
    });
});