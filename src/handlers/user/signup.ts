import asyncHandler from 'express-async-handler';
import validator from 'validator';

import ApiError from '../../errors/ApiError';
import UserModel from '../../models/user.model';
import { hashPassword } from '../../utils/password.util';
import { generateToken } from '../../utils/token.util';

// route:   POST /signup
// access:  public
// TODO: verify email
export const signup = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  if (!email || !password) return next(new ApiError('email and password are required', 400));
  const hashedPassword = hashPassword(password);
  const user = await UserModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  const token = generateToken(user.id);
  res.locals.userId = user.id;
  await user.update({ token });
  res.status(200).json({ token });
  next();
});
