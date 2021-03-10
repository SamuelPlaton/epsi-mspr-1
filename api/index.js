import SQLInstance from './SQLInstance.js';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
import { getStoreRouter, putStoreRouter } from './routes/stores/index.js';
import { getCouponRouter, postCouponRouter, putCouponRouter } from './routes/coupons/index.js';
import { deleteUserRouter, getUserRouter, postUserRouter, putUserRouter } from './routes/users/index.js';

// Enable .env config variables
dotenv.config();
// Setup our sql instance
export const sqlInstance = new SQLInstance('localhost',3306, 'root', '', 'mspr');
sqlInstance.connect();

// Define our swagger doc
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Api Documentation',
      description: 'This is our Angular App Mobile api doc',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

// Create our express App
export const app = express();
app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Store routes
app.use('/', getStoreRouter);
app.use('/', putStoreRouter);
// Coupon routes
app.use('/', getCouponRouter);
app.use('/', postCouponRouter);
app.use('/', putCouponRouter);
// User routes
app.use('/', postUserRouter);
app.use('/', getUserRouter);
app.use('/', deleteUserRouter);
app.use('/', putUserRouter);

// Make our app listen to port 3000
app.listen(3000);

