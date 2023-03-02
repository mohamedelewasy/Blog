import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();
const { PG_HOST, PG_DB, PG_PORT, PG_DB_TEST, PG_USER, PG_PASSWORD, ENV } = process.env;
const sequelize = new Sequelize(
  `postgres://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${
    ENV == 'test' ? PG_DB_TEST : PG_DB
  }`,
  { logging: false }
);

export default sequelize;
