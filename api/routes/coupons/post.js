import express from 'express';
import {checkToken} from "../security/security.js";
import {sqlInstance} from "../../index.js";

export const routes = express.Router();

/**
 * @swagger
 *
 * /coupons:
 *   post:
 *     tags:
 *       - coupons
 *     produces:
 *       - application/json
 *     summary:
 *       - Add a user_coupon relation to the database
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            userId:
 *              type: string
 *            userToken:
 *              type: string
 *            couponId:
 *              type: string
 *            example:
 *              userId: string
 *              userToken: string
 *              couponId: string
 *     responses:
 *      '201':
 *        description: Posted
 *      '400':
 *        description: Bad parameters
 *      '403':
 *        description: Wrong token
 */
routes.post('/coupons', async (request, response) => {
    const {userId, userToken, couponId} = request.body.data;
    const uuid = uuidv4();
    // Parameters check
    if(!userId || !userToken || !couponId){
        response.send('Bad parameters');
        response.status(400).end();
        return;
    }
    // Token check
    const properToken = await checkToken(userToken, userId);
    if(!properToken){
        response.send('Wrong token');
        response.status(403).end();
        return;
    }

    // Check if coupon is valid
    const couponValid = await sqlInstance.request('SELECT * FROM COUPON WHERE ID = ? AND VALID = 1', [couponId]).then(result => {
        return result.length > 0;
    });
    if(!couponValid){
        response.send('Invalid coupon');
        response.status(403).end();
        return;
    }

    // Do insertion
    const sql = "INSERT INTO USER_COUPON(ID, USER, COUPON, FAVORED, USED) VALUES(?, ?, ?, ?, ?)";
    sqlInstance.request(sql,
        [uuid,
            userId,
            couponId,
            0,
            0]).then(result => {
        response.send("");
        response.status(201).end();
    });
});