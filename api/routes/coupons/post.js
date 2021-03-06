import express from 'express';
import {checkToken, checkUserCoupon} from "../security/security.js";
import {sqlInstance} from "../../index.js";
import {v4 as uuidv4} from 'uuid';

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
    const data = request.body.data;
    const uuid = uuidv4();
    // Parameters check
    if (!data || !data.userId || !data.userToken || !data.couponId) {
        response.status(400);
        response.send('-1').end();
        return;
    }
    // Token check
    const properToken = await checkToken(data.userToken, data.userId);
    if (!properToken) {
        response.status(403);
        response.send('-2').end();
        return;
    }


    // Check if coupon is valid
    const couponValid = await sqlInstance.request('SELECT * FROM COUPON WHERE ID = ? AND VALID = 1', [data.couponId]).then(result => {
        return result.length > 0;
    });
    if (!couponValid) {
        response.status(403);
        response.send('-10').end(); // Invalid coupon
        return;
    }

    const alreadyExistingCoupon = await checkUserCoupon(data.userId, data.couponId);
    if (alreadyExistingCoupon) {
        response.status(403);
        response.send('-11').end(); // Used coupon
        return;
    }

    // Do insertion
    const sql = "INSERT INTO USER_COUPON(ID, USER, COUPON, USED, FAVORED) VALUES(?, ?, ?, ?, ?)";
    sqlInstance.request(sql,
        [uuid,
            data.userId,
            data.couponId,
            0,
            1]).then(result => {
        response.status(201);
        response.send({
            id: uuid,
            user: data.userId,
            coupon: data.couponId,
            used: 0,
            favored: 1
        }).end();
    });
});
