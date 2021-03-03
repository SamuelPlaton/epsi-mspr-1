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
  const {firstName, lastName, email, token} = request.body.data;
  if (!firstName || !lastName || !email || !token) {
    response.send('Bad parameters');
    response.status(400).end();
    return;
  }

  const properToken = await checkToken(token, request.params.id);
  if(!properToken){
    response.send('Wrong token');
    response.status(403).end();
    return;
  }

  // Check if email or phone already exist
  const emailExist = await sqlInstance.request('SELECT * FROM USERS WHERE EMAIL = ? AND ID != ?', [email, request.params.id]).then(result => {
    return result.length > 0;
  });
  if(emailExist){
    response.send('Email already exist');
    response.status(403).end();
    return;
  }

  // Update our user
  const sql = 'UPDATE USERS SET FIRSTNAME = ?, LASTNAME = ?, EMAIL = ? WHERE ID = ?';
  sqlInstance.request(sql,
    [
      firstName,
      lastName,
      email,
      request.params.id]).then(result => {
    response.send('');
    response.status(200).end();
  });
});

// Method PUT to modify a user stores
/**
 * @swagger
 *
 * /users/stores/:id:
 *   put:
 *     tags:
 *       - users
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
 *            token:
 *              type: string
 *            example:
 *              stores: ["1", "2", "3"]
 *              token: string
 *     responses:
 *      '200':
 *        description: Updated
 *      '400':
 *        description: Bad parameters
 *      '403':
 *        description: Unauthorized
 *
 */
routes.put('/users/stores/:id', async (request, response) => {
  const {stores, token} = request.body.data;

  if (!stores || !token) {
    response.send('Bad parameters');
    response.status(400).end();
    return;
  }

  const properToken = await checkToken(token, request.params.id);
  if(!properToken){
    response.send('Wrong token');
    response.status(403).end();
    return;
  }

  // delete users sectors
  await sqlInstance.request('DELETE FROM USER_STORE WHERE USER = ?', [request.params.id]);

  // add users sectors
  stores.map(store => {
      sqlInstance.request('INSERT INTO USERS_STORE(USER, STORE) VALUES (?, ?)', [store, request.params.id]);
  });
  response.send('');
  response.status(200).end();
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
  const {previousPassword, newPassword, token} = request.body.data;
  if (!previousPassword || !newPassword || !token) {
    response.send('Bad parameters');
    response.status(400).end();
    return;
  }

  const properToken = await checkToken(token, request.params.id);
  if(!properToken){
    response.send('Wrong token');
    response.status(403).end();
    return;
  }

  // Encrypt old password and compare it to token
  const pwdToToken = cryptoJS.AES.encrypt(previousPassword, '22787802-a6e7-4c3d-8fc1-aab0ece1cb41');
  const pwd = cryptoJS.AES.decrypt(pwdToToken, '22787802-a6e7-4c3d-8fc1-aab0ece1cb41').toString();
  // Decrypt DB Token
  const tokenToPwd = cryptoJS.AES.decrypt(token, '22787802-a6e7-4c3d-8fc1-aab0ece1cb41').toString();

  if(pwd !== tokenToPwd){
    response.send('Wrong previous password');
    response.status(403).end();
    return;
  }
  // Crypt new password
  const newToken = cryptoJS.AES.encrypt(newPassword, '22787802-a6e7-4c3d-8fc1-aab0ece1cb41').toString();

  // Update our user
  const sql = 'UPDATE USERS SET TOKEN = ? WHERE ID = ?';
  sqlInstance.request(sql,
      [
        newToken,
        request.params.id]).then(result => {
    response.send(newToken);
    response.status(200).end();
  });
});