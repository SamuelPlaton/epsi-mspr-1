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
 *            favored:
 *              type: string
 *            used:
 *              type: string
 *            example:
 *              userId: string
 *              userToken: string
 *              couponId: string
 *              favored: 1
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
    const {userId, userToken, couponId, favored, used} = request.body.data;
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

    // Do insertion
    const sql = "INSERT INTO USER_COUPON(ID, USER, COUPON, FAVORED, USED) VALUES(?, ?, ?, ?, ?)";
    sqlInstance.request(sql,
        [uuid,
            userId,
            couponId,
            favored,
            used]).then(result => {
        response.send("");
        response.status(201).end();
    });
});
