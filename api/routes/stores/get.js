import express from 'express';
import { sqlInstance } from '../../index.js';

export const routes = express.Router();

// Select all stores
/**
 * @swagger
 *
 * /stores:
 *   get:
 *     tags:
 *       - stores
 *     produces:
 *       - application/json
 *     summary:
 *       - Get data from stores
 *     responses:
 *      '200':
 *        description: Array of stores
 */
routes.get('/stores', (request, response) => {
    sqlInstance.request("SELECT * FROM STORE").then(result => {
        response.send(result);
    });
});

// Select selected stores
/**
 * @swagger
 *
 * /stores/selected:
 *   get:
 *     tags:
 *       - stores
 *     produces:
 *       - application/json
 *     summary:
 *       - Get a list of specific stores
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
 *        description: Array of stores
 *
 */
routes.get('/stores/selected', (request, response) => {
    sqlInstance.request("SELECT * FROM STORE WHERE ID IN (?)", [request.query.ids.split(',')]).then(result => {
        response.send(result);
    });
});

// Select specific stores
/**
 * @swagger
 *
 * /stores/:id:
 *   get:
 *     tags:
 *       - stores
 *     produces:
 *       - application/json
 *     summary:
 *       - Get a store
 *
 *     responses:
 *      '200':
 *        description: Store
 *
 */
routes.get('/stores/:id', (request, response) => {
    sqlInstance.request("SELECT * FROM STORE WHERE ID = ?", [request.params.id]).then(result => {
        response.send(result);
    });
});

