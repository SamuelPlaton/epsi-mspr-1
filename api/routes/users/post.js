import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import cryptoJS from 'crypto-js';
import { sqlInstance } from '../../index.js';

export const routes = express.Router();

//Method POST for a user
/**
 * @swagger
 *
 * /users:
 *   post:
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     summary:
 *       - Add a user to the database
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
 *            password:
 *              type: string
 *            birthday:
 *              type: string
 *            example:
 *              firstName: string
 *              lastName: string
 *              email: string
 *              password: string
 *              birthday: Date
 *     responses:
 *      '201':
 *        description: Posted
 *      '403':
 *        description: Email already exist
 *
 */
routes.post('/users', async (request, response) => {
  const {firstName, lastName, email, password, birthday} = request.body.data;
  const uuid = uuidv4();

  if (!firstName || !lastName || !email || !password || !birthday) {
    response.send('Bad parameters');
    response.status(400).end();
    return;
  }
  // Crypt password
  const token = cryptoJS.AES.encrypt(password, '22787802-a6e7-4c3d-8fc1-aab0ece1cb41').toString();

  // Check if email or phone already exist
  const emailExist = await sqlInstance.request('SELECT * FROM USERS WHERE EMAIL = ?', [email]).then(result => {
    return result.length > 0;
  });
  if(emailExist){
    response.send('Email already exist');
    response.status(403).end();
    return;
  }

  // Insert our user
  const sql = 'INSERT INTO USERS(ID, FIRSTNAME, LASTNAME, EMAIL, TOKEN, BIRTHDAY) VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
  sqlInstance.request(sql,
    [uuid,
      firstName,
      lastName,
      email,
      token,
      birthday]).then(result => {
    response.send(token);
    response.status(201).end();
  });

});

// Method POST for a user login
/**
 * @swagger
 *
 * /users/login:
 *   post:
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     summary:
 *       - Login a user
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            example:
 *              email: string
 *              password: string
 *     responses:
 *      '200':
 *        description: Success
 *      '400':
 *        description: Bad parameters
 *      '403':
 *        description: Wrong email or password
 */
routes.post('/users/login', async (request, response) => {
  const {email, password} = request.body.data;
  if (!email || !password) {
    response.send('Bad parameters');
    response.status(400).end();
    return;
  }
  // Retrieve token if the email is found
  const tokenResult = await sqlInstance.request("SELECT TOKEN FROM USERS WHERE EMAIL = ? LIMIT 1",
    [email]).then(result => {
    return result;
  });
  if (tokenResult.length === 0) {
    response.send('Email not found');
    response.status(403).end();
    return;
  }

  // Encrypt then decrypt password
  const pwdToToken = cryptoJS.AES.encrypt(password, '22787802-a6e7-4c3d-8fc1-aab0ece1cb41');
  const pwd = cryptoJS.AES.decrypt(pwdToToken, '22787802-a6e7-4c3d-8fc1-aab0ece1cb41').toString();
  // Decrypt DB Token
  const tokenToPwd = cryptoJS.AES.decrypt(tokenResult[0]['TOKEN'], '22787802-a6e7-4c3d-8fc1-aab0ece1cb41').toString();
  // Handle connexion success or failure
  if(pwd === tokenToPwd){
    response.send(tokenResult[0]);
    response.status(200).end();
  }else{
    response.send('Wrong password');
    response.status(403).end();
  }
});