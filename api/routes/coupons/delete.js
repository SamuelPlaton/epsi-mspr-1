import express from 'express';
import { sqlInstance } from '../../index.js';
import { checkToken } from '../security/security.js';

export const routes = express.Router();

// Method DELETE for a coupon
/**
 * @swagger
 *
 * /coupons/{id}:
 *   delete:
 *     tags:
 *       - coupons
 *     produces:
 *       - application/json
 *     summary:
 *       - Delete a user coupon from the database
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            token:
 *              type: string
 *            userId:
 *              type: string
 *            example:
 *              token: string
 *              userId: string
 *     responses:
 *      '204':
 *        description: DELETED
 *      '400':
 *        description: Bad parameters
 *      '403':
 *        description: Unauthorized
 */
routes.delete('/coupons/:id', async (request, response) => {
    const { token, userId } = request.body.data;

    if (!request.body.data || !token || !userId) {
        response.status(400);
        response.send('-1').end();
        return;
    }

    const properToken = await checkToken(token, userId);
    if(!properToken){
        response.status(403);
        response.send('-2').end();
        return;
    }

    sqlInstance.request('DELETE FROM USER_COUPON WHERE ID = ? AND USED = 0', [request.params.id]).then(result => {
        response.status(204);
        response.send('10').end();
    });


});