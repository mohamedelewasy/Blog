import asyncHandler from 'express-async-handler';

import ApiError from '../errors/ApiError';
import UserModel from '../models/user.model';
import { verifyToken } from '../utils/token.util';

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next(new ApiError('login required', 400));
  const userId = verifyToken(token);
  const user = await UserModel.findOne({ attributes: ['token'], where: { id: userId } });
  if (token != user?.token) return next(new ApiError('invalid token', 400));
  res.locals.userId = userId;
  return next();
});
