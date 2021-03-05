import express from 'express';
import {checkToken} from "../security/security.js";
import {sqlInstance} from "../../index.js";

export const routes = express.Router();

/**
 * @swagger
 *
 * /coupons:
 *   put:
 *     tags:
 *       - coupons
 *     produces:
 *       - application/json
 *     summary:
 *       - Update a user_coupon relation to the database
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
 *            used:
 *              type: string
 *            example:
 *              userId: string
 *              userToken: string
 *              userCouponId: string
 *              used: 1
 *     responses:
 *      '201':
 *        description: Updated
 *      '400':
 *        description: Bad parameters
 *      '403':
 *        description: Wrong token
 */
routes.put('/coupons', async (request, response) => {
    const {userId, userToken, userCouponId, used} = request.body.data;
    // Parameters check
    if(!userId || !userToken || !userCouponId || !used){
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

    // Do insertion
    const sql = "UPDATE USER_COUPON SET USED = ? WHERE ID = ?";
    sqlInstance.request(sql,
        [used,
            userCouponId]).then(result => {
        response.send('');
        response.status(201).end();
    });
});
