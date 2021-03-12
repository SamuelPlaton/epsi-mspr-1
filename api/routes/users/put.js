import express from 'express';
import { sqlInstance } from '../../index.js';
import { checkToken } from '../security/security.js';
import cryptoJS from "crypto-js";

export const routes = express.Router();

// Method PUT to modify a user
/**
 * @swagger
 *
 * /users/{id}:
 *   put:
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     summary:
 *       - Update a user to the database
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            firstName:
 *              type: string
 *            lastName:
 *              type: string
 *            email:
 *              type: string
 *            token:
 *              type: string
 *            example:
 *              firstName: string
 *              lastName: string
 *              email: string
 *              token: string
 *     responses:
 *      '200':
 *        description: Updated
 *     '400':
 *        description: Bad parameters
 *     '403':
 *        description: Unauthorized
 *
 */
routes.put('/users/:id', async (request, response) => {
  const data = request.body.data;
  if ( !data || !data.firstName || !data.lastName || !data.email || !data.token) {
    response.status(400);
    response.send('-1').end();
    return;
  }

  const properToken = await checkToken(data.token, request.params.id);
  if(!properToken){
    response.status(403);
    response.send('-2').end();
    return;
  }

  // Check if email or phone already exist
  const emailExist = await sqlInstance.request('SELECT * FROM USER WHERE EMAIL = ? AND ID != ?', [data.email, request.params.id]).then(result => {
    return result.length > 0;
  });
  if(emailExist){
    response.status(403);
    response.send('-20').end();
    return;
  }

  // Update our user
  const sql = 'UPDATE USER SET FIRSTNAME = ?, LASTNAME = ?, EMAIL = ? WHERE ID = ?';
  sqlInstance.request(sql,
    [
      data.firstName,
      data.lastName,
      data.email,
      request.params.id]).then(result => {
    response.status(200);
    response.send({
      id: request.params.id,
      firstName: data.firstName,
      lastName: data.lastName,
      token: data.token,
      email: data.email
    }).end();
  });
});

// Method PUT to modify a password user
/**
 * @swagger
 *
 * /users/password/:id:
 *   put:
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     summary:
 *       - Update a user password to the database
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            previousPassword:
 *              type: string
 *            newPassword:
 *            token:
 *              type: string
 *            example:
 *              previousPassword: string
 *              newPassword: string
 *              token: string
 *     responses:
 *      '200':
 *        description: Password Updated
 *     '400':
 *        description: Bad parameters
 *     '403':
 *        description: Unauthorized
 *
 */
routes.put('/users/password/:id', async (request, response) => {
  const data = request.body.data;
  if ( !data || !data.previousPassword || !data.newPassword || !data.token) {
    response.status(400);
    response.send('-1').end();
    return;
  }

  const properToken = await checkToken(data.token, request.params.id);
  if(!properToken){
    response.status(403);
    response.send('-2').end();
    return;
  }

  // Encrypt old password and compare it to token
  const pwdToToken = cryptoJS.AES.encrypt(data.previousPassword, '22787802-a6e7-4c3d-8fc1-aab0ece1cb41');
  const pwd = cryptoJS.AES.decrypt(pwdToToken, '22787802-a6e7-4c3d-8fc1-aab0ece1cb41').toString();
  // Decrypt DB Token
  const tokenToPwd = cryptoJS.AES.decrypt(data.token, '22787802-a6e7-4c3d-8fc1-aab0ece1cb41').toString();

  if(pwd !== tokenToPwd){
    response.status(403);
    response.send('-23').end();
    return;
  }
  // Crypt new password
  const newToken = cryptoJS.AES.encrypt(data.newPassword, '22787802-a6e7-4c3d-8fc1-aab0ece1cb41').toString();

  // Update our user
  const sql = 'UPDATE USER SET TOKEN = ? WHERE ID = ?';
  sqlInstance.request(sql,
      [
        newToken,
        request.params.id]).then(result => {
    response.status(200);
    response.send(newToken).end();
  });
});