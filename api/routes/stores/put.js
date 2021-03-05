import {checkToken} from "../security/security.js";
import {sqlInstance} from "../../index.js";
import express from "express";

export const routes = express.Router();

/**
 * @swagger
 *
 * /stores:
 *   put:
 *     tags:
 *       - stores
 *     produces:
 *       - application/json
 *     summary:
 *       - Update user stores to the database
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            stores:
 *              type: array
 *            userToken:
 *              type: string
 *            userId:
 *              type: string
 *            example:
 *              userId: string
 *              stores: ["1", "2", "3"]
 *              userToken: string
 *     responses:
 *      '200':
 *        description: Updated
 *      '400':
 *        description: Bad parameters
 *      '403':
 *        description: Unauthorized
 *
 */
routes.put('/stores', async (request, response) => {
    const {userId, stores, userToken} = request.body.data;

    if (!stores || !userToken) {
        response.send('Bad parameters');
        response.status(400).end();
        return;
    }

    const properToken = await checkToken(userToken, userId);
    if(!properToken){
        response.send('Wrong token');
        response.status(403).end();
        return;
    }

    // delete users sectors
    await sqlInstance.request('DELETE FROM USER_STORE WHERE USER = ?', [userId]);

    // add users sectors
    stores.map(store => {
        sqlInstance.request('INSERT INTO USER_STORE(USER, STORE) VALUES (?, ?)', [userId, store]);
    });
    response.send('');
    response.status(200).end();
});
