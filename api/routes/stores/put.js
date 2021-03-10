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
    const data = request.body.data;

    if (!data || !data.stores || !data.userId ||  !data.userToken) {
        response.status(400);
        response.send('-1').end();
        return;
    }

    const properToken = await checkToken(data.userToken, data.userId);
    if(!properToken){
        response.status(403);
        response.send('-2').end();
        return;
    }

    // delete users sectors
    await sqlInstance.request('DELETE FROM USER_STORE WHERE USER = ?', [data.userId]);

    // add users sectors
    data.stores.map(store => {
        sqlInstance.request('INSERT INTO USER_STORE(USER, STORE) VALUES (?, ?)', [data.userId, store]);
    });
    response.status(200);
    response.send(data.stores.map(store => {
        return {user: data.userId, store: store}
    })).end();
});
