/* eslint-disable no-console */
import dotenv from 'dotenv';
import express from 'express';

import sequelize from './config/db';
import { errorHandler } from './middlewares/errorHandler';
import apiRoutes from './routes/index';

dotenv.config();
const app = express();
const env = process.env.ENV;

app.use(express.json());
// logger
if (env === 'development')
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${res.statusCode}`);
    next();
  });

// test app health
app.use('/healthz', (req, res) => {
  res.status(200).send('ok');
});

// api routes
app.use('/api/v1', apiRoutes);
// error handler
app.use(errorHandler);

// connect db
sequelize
  .authenticate()
  .then(() => console.log('db connecetd...'))
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

export default app;
export const __BASEdIRECTORY = __dirname;
