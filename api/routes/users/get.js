import express from 'express';
import { sqlInstance } from '../../index.js';

export const routes = express.Router();

// Method GET of all data of a user
/**
 * @swagger
 *
 * /users/{id}:
 *   get:
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     summary:
 *       - Get all data from a user
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *            stores:
 *              type: string
 *            coupons:
 *              type: string
 *            example:
 *              stores: true
 *              coupons: true
 *     responses:
 *      '200':
 *        description: User data is retrieved
 *
 *
 */
routes.get('/users/:id', async (request, response) => {
  // Retrieve our Users, his coupons and stores affiliated
  const includes = request.query;
  // Setup our default query and param
  const query = ['SELECT U.id, U.firstName, U.lastName, U.email, U.register_date, U.birthday FROM USER U WHERE U.ID = ?'];
  const queryParams = [request.params.id];

  const storesIds = await sqlInstance.request('SELECT STORE FROM USER_STORE WHERE USER = ?', [request.params.id]).then(response => {
    return response.map(e => e['STORE']);
  })
  storesIds.push('X');
  const [couponIds, userCouponIds] = await sqlInstance.request('SELECT ID, COUPON FROM USER_COUPON WHERE USER = ?', [request.params.id]).then(response => {
    return  [response.map(e => e['COUPON']), response.map(e => e['ID']) ];
  });

  couponIds.push('X');
  userCouponIds.push('X');
  // Our queries index result
  const idx = [0, null, null, null, null];
  let acc = 0;
  // Everytime an include is settled, we increment the index result
  if(includes){
    if(includes.stores){
      query.push('SELECT * FROM STORE WHERE ID IN (?)');
      queryParams.push(storesIds);
      acc += 1;
      idx[1] = acc;
    }
    if(includes.coupons){
      query.push('SELECT * FROM USER_COUPON WHERE USER = ?');
      queryParams.push(request.params.id);
      acc += 1;
      idx[2] = acc;
      query.push('SELECT * FROM COUPON WHERE ID IN (?)');
      queryParams.push(couponIds);
      acc += 1;
      idx[3] = acc;
      query.push('SELECT * FROM HISTORIQUE_COUPON WHERE USER_COUPON IN (?)');
      queryParams.push(userCouponIds);
      acc += 1;
      idx[4] = acc;
    }
  }
  // Set our final query
  sqlInstance.request(query.join(';'), queryParams).then(result => {
    response.send({
      user: result[idx[0]][0],
      stores : result[idx[1]],
      userCoupons: result[idx[2]],
      coupons: result[idx[3]],
      historiqueCoupons: result[idx[4]],
    });
  });
});

// Method GET of all selected users data
/**
 * @swagger
 *
 * /users:
 *   get:
 *     tags:
 *       - users
 *     produces:
 *       - application/json
 *     summary:
 *       - Get a list of users from the database
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              ids:
 *                type: array
 *            example:
 *              ids: [1, 2, 3]
 *
 *     responses:
 *      '200':
 *        description: Array of users
 *      '400':
 *        description: Bad parameters
 *
 *
 */
routes.get('/users', (request, response) => {
  const {ids} = request.query;
  if (!ids) {
    response.status(400);
    response.send('-1').end();
    return;
  }
  sqlInstance.request('SELECT id, firstName, lastName, email, register_date, birthday FROM USER WHERE ID IN (?)', [ids.split(',')]).then(result => {
    response.send(result);
  });
});
