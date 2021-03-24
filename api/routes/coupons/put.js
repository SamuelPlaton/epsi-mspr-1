import express from 'express';
import {
    checkMaxLimitCoupon,
    checkToken,
    checkSumCoupon,
    checkUsedCoupon,
    checkUniqueCoupon
} from "../security/security.js";
import {sqlInstance} from "../../index.js";
import {v4 as uuidv4} from 'uuid';

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
 *            favored:
 *              type: string
 *            action:
 *              type: string
 *            example:
 *              userId: string
 *              userToken: string
 *              userCouponId: string
 *              couponId: string
 *              favored: 1
 *              used: 1
 *              action: use (optional)
 *     responses:
 *      '201':
 *        description: Updated
 *      '400':
 *        description: Bad parameters
 *      '403':
 *        description: Wrong token
 */
routes.put('/coupons', async (request, response) => {
    const data = request.body.data;
    // Parameters check
    if( !data || !data.userId || !data.userToken || !data.userCouponId || !data.couponId || !data.used || !data.favored){
        response.status(400);
        response.send('-1').end();
        return;
    }
    // Token check
    const properToken = await checkToken(data.userToken, data.userId);
    if(!properToken){
        response.status(403);
        response.send('-2').end();
        return;
    }

    // If we want to use the coupon
    if(data.action && data.action === "use"){
        // Check if coupon is valid
        const couponValid = await sqlInstance.request('SELECT * FROM COUPON WHERE ID = ? AND VALID = 1', [data.couponId]).then(result => {
            return result.length > 0;
        });

        if (!couponValid) {
            response.status(403);
            response.send('-10').end(); // Invalid coupon
            return;
        }

        const usedCoupon = await checkUsedCoupon(data.userId, data.couponId);
        const uniqueCoupon = await checkUniqueCoupon(data.couponId);
        if (usedCoupon && uniqueCoupon) {
            response.status(403);
            response.send('-13').end(); // Coupon Already Used
            return;
        }

        const maxLimitCoupon = await checkMaxLimitCoupon(data.couponId);
        const totalUses = await checkSumCoupon(data.couponId);
        if (totalUses >= maxLimitCoupon) {
            response.status(403);
            response.send('-14').end(); // Max uses reached
            return;
        }

        await sqlInstance.request('INSERT INTO HISTORIQUE_COUPON(ID, USER_COUPON) VALUES(?, ?)', [uuidv4(), data.userCouponId]);
    }

    // Do insertion
    const sql = "UPDATE USER_COUPON SET USED = ?, FAVORED = ? WHERE ID = ?";
    sqlInstance.request(sql,
        [data.used,
            data.favored,
            data.userCouponId]).then(result => {
        response.status(201);
        response.send({
            id: data.userCouponId,
            user: data.userId,
            coupon: data.couponId,
            used: data.used,
            favored: data.favored
        }).end();
    });
});
