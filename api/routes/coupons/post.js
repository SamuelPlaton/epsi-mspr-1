import express from 'express';
import {checkToken, checkUniqueCoupon, checkUserCoupon} from "../security/security.js";
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
    const {userId, userToken, couponId} = request.body.data;
    const uuid = uuidv4();
    // Parameters check
    if (!request.body.data || !userId || !userToken || !couponId) {
        response.status(400);
        response.send('-1').end();
        return;
    }
    // Token check
    const properToken = await checkToken(userToken, userId);
    if (!properToken) {
        response.status(403);
        response.send('-2').end();
        return;
    }


    // Check if coupon is valid
    const couponValid = await sqlInstance.request('SELECT * FROM COUPON WHERE ID = ? AND VALID = 1', [couponId]).then(result => {
        return result.length > 0;
    });
    if (!couponValid) {
        response.status(403);
        response.send('-10').end(); // Invalid coupon
        return;
    }
    const uniqueCoupon = await checkUniqueCoupon(couponId);
    const alreadyUsedCoupon = await checkUserCoupon(userId, couponId);
    if (uniqueCoupon && alreadyUsedCoupon) {
        response.status(403);
        response.send('-11').end(); // Used coupon
        return;
    }

    // Do insertion
    const sql = "INSERT INTO USER_COUPON(ID, USER, COUPON, USED) VALUES(?, ?, ?, ?)";
    sqlInstance.request(sql,
        [uuid,
            userId,
            couponId,
            0]).then(result => {
        response.status(201);
        response.send({
            id: uuid,
            user: userId,
            coupon: couponId,
            used: 0
        }).end();
    });
});
