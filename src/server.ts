/* eslint-disable no-console */
import dotenv from 'dotenv';
import express from 'express';

import sequelize from './config/db';

dotenv.config();
const app = express();
const env = process.env.ENV;
const port = process.env.port;

app.use('/healthz', (req, res) => {
  res.status(200).send('ok');
});

// connect db
sequelize
  .authenticate()
  .then(() => console.log('db connecetd...'))
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

app.listen(port, () => console.log(`server runs on port ${port} in ${env} environment`));
