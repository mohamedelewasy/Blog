/* eslint-disable no-console */
import dotenv from 'dotenv';
import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'sequelize';

import ApiError from '../errors/ApiError';

dotenv.config();
export const errorHandler: ErrorRequestHandler = (err: Error, req, res, next) => {
  if (process.env.ENV === 'development') console.log(err.stack);
  if (err instanceof ApiError) return res.status(err.statusCode).json({ error: err.message });
  if (err instanceof ValidationError)
    return res.status(400).json({
      error: err.errors.map(x => {
        return x.message;
      }),
    });
  res.status(500).json({ error: err.message || 'something went wrong' });
  return next();
};
