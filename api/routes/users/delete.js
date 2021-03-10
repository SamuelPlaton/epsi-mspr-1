import express from 'express';
import { sqlInstance } from '../../index.js';
import { checkToken } from '../security/security.js';

export const routes = express.Router();

// Method DELETE for a user
/**
 * @swagger
 *
 * /users/{id}:
 *   delete:
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     summary:
 *       - Delete a user from the database (and his non used coupons and  stores affiliated)
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            token:
 *              type: string
 *            example:
 *              token: string
 *     responses:
 *      '204':
 *        description: DELETED
 *      '400':
 *        description: Bad parameters
 *      '403':
 *        description: Unauthorized
 */
routes.delete('/users/:id', async (request, response) => {
  const { token } = request.body.data;

  if (!request.body.data || !token) {
    response.status(400);
    response.send('-1').end();
    return;
  }

  const properToken = await checkToken(token, request.params.id);
  if(!properToken){
    response.status(403);
    response.send('-2').end();
    return;
  }

  try {
    // Delete users_sectors
    await sqlInstance.request('DELETE FROM USER_STORE WHERE USER = ?', [request.params.id]);
    // Delete waiting services
    await sqlInstance.request('DELETE FROM USER_COUPON WHERE USER = ? AND USED = 0', [request.params.id]);
    // Delete user
    sqlInstance.request('DELETE FROM USER WHERE ID = ?', [request.params.id]).then(result => {
      response.status(204);
      response.send('20').end();
    });
  } catch (err) {
    throw new Error(err);
  }


});