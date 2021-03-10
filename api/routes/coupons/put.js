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
 *              couponId: string
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
    const {userId, userToken, userCouponId, used, couponId} = request.body.data;
    // Parameters check
    if( !request.body.data || !userId || !userToken || !userCouponId || !used){
        response.status(400);
        response.send('-1').end();
        return;
    }
    // Token check
    const properToken = await checkToken(userToken, userId);
    if(!properToken){
        response.status(403);
        response.send('-2').end();
        return;
    }

    // Do insertion
    const sql = "UPDATE USER_COUPON SET USED = ? WHERE ID = ?";
    sqlInstance.request(sql,
        [used,
            userCouponId]).then(result => {
        response.status(201);
        response.send({
            id: userCouponId,
            user: userId,
            coupon: couponId,
            used: used
        }).end();
    });
});
