import express from 'express';
import { sqlInstance } from '../../index.js';
import {checkToken} from "../security/security.js";

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
 *            user:
 *              type: string
 *            token:
 *              type: string
 *            example:
 *              stores: true
 *              user: userId
 *              token: userToken
 *     responses:
 *      '200':
 *        description: Coupon data is retrieved
 *
 *
 */
routes.get('/coupons/:id', async (request, response) => {
    // Retrieve our Coupons, his users and stores affiliated
    const includes = request.query;
    // Setup our default query and param
    const query = ['SELECT * FROM COUPON C WHERE C.ID = ?'];
    const queryParams = [request.params.id];
    // Our queries index result
    const idx = [0, null, null, null];
    let acc = 0;
    const storesIds = await sqlInstance.request('SELECT STORE FROM COUPON_STORE WHERE COUPON = ?', [request.params.id]).then(response => {
        return response.map(e => e['STORE']);
    });
    storesIds.push('X');
    // Everytime an include is settled, we increment the index result
    if(includes){
        if(includes.stores){
            query.push('SELECT * FROM STORE S WHERE S.ID IN (?)');
            queryParams.push(storesIds);
            acc += 1;
            idx[1] = acc;
        }if(includes.user && includes.token){
            const properToken = await checkToken(includes.token, includes.user);
            if(!properToken){
                response.status(403);
                response.send('-2').end();
                return;
            }
            const userCouponsIds = await sqlInstance.request('SELECT ID FROM USER_COUPON WHERE COUPON = ? AND USER = ?', [request.params.id, includes.user]).then(response => {
                return response.map(r => r['ID']);
            });

            query.push('SELECT * FROM USER_COUPON WHERE ID IN (?)');
            queryParams.push(userCouponsIds);
            acc += 1;
            idx[2] = acc;
            query.push('SELECT * FROM HISTORIQUE_COUPON WHERE USER_COUPON IN (?)');
            queryParams.push(userCouponsIds);
            acc += 1;
            idx[3] = acc;
        }
    }
    // Set our final query
    sqlInstance.request(query.join(';'), queryParams).then(result => {
        response.send({
            coupon: result[idx[0]],
            stores : result[idx[1]],
            userCoupons: result[idx[2]],
            historiqueCoupons: result[idx[3]],
        });
    });
});

// Method get of data of a coupon from his code
/**
 * @swagger
 *
 * /coupons/code/{id}:
 *   get:
 *     tags:
 *       - coupons
 *     produces:
 *       - application/json
 *     summary:
 *       - Get all data from a coupon
 *     responses:
 *      '200':
 *        description: Coupon data is retrieved
 *
 *
 */
routes.get('/coupons/code/:code', async (request, response) => {
    sqlInstance.request('SELECT * FROM COUPON C WHERE C.CODE = ?', [request.params.code]).then(result => {
        response.status(200);
        response.send(result).end();
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
        response.status(400);
        response.send('-1').end();
        return;
    }
    sqlInstance.request('SELECT * FROM COUPON WHERE ID IN (?)', [ids.split(',')]).then(result => {
        response.send(result);
    });
});


// Method GET of all selected coupons data
/**
 * @swagger
 *
 * /coupons/recommended/:idUser:
 *   get:
 *     tags:
 *       - coupons
 *     produces:
 *       - application/json
 *     summary:
 *       - Get a list of coupons recommended from the database with the userCoupons affiliated
 *
 *     responses:
 *      '200':
 *        description: Array of coupons
 *      '400':
 *        description: Bad parameters
 *
 *
 */
routes.get('/coupons/recommended/:idUser', async (request, response) => {

    // Retrieve favorites stores of the user
    const storeIds = await sqlInstance.request('SELECT STORE FROM USER_STORE WHERE USER = ?', [request.params.idUser]).then(response => {
        return response.map(e => e['STORE']);
    });

    // Add 'X' values so the ids are never empty, avoid an error when doing an 'IN (*empty*)' in SQL
    storeIds.push('X');
    // Retrieve the coupons available in the selected stores
    const couponIds = await sqlInstance.request('SELECT COUPON FROM COUPON_STORE WHERE STORE IN (?)', [storeIds]).then(response => {
        return response.map(e => e['COUPON']);
    });

    couponIds.push('X');
    // Retrieve the coupons already in user coupons and not used
    const userCouponIds = await sqlInstance.request('SELECT COUPON FROM USER_COUPON WHERE USER = ? AND USED = 1', [request.params.idUser]).then(response => {
        return response.map(e => e['COUPON']);
    });

    // Retrieve user affiliated coupons
    const userCoupons = await sqlInstance.request('SELECT * FROM USER_COUPON WHERE USER = ? AND USED = 0', [request.params.idUser]).then(response => {
        return response;
    });

    userCouponIds.push('X');
    sqlInstance.request('SELECT * FROM COUPON WHERE ID IN (?) AND `VALID` = 1', [couponIds]).then(result => {
        response.send({
            coupons: result.filter(res => !(userCouponIds.includes(res['id']) && res['unique'] === 1)),
            userCoupons: userCoupons
        });
    });
});

