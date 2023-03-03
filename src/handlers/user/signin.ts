import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import UserModel from '../../models/user.model';
import { comparePassword } from '../../utils/password.util';
import { generateToken } from '../../utils/token.util';

// route:   POST /signin
// access:  public
export const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return next(new ApiError('email and password are required', 400));
  const user = await UserModel.findOne({
    attributes: ['id', 'email', 'password', 'token'],
    where: { email },
  });
  if (!user || !comparePassword(password, user.password))
    return next(new ApiError('incorrect email or password', 400));
  const token = generateToken(user.id);
  await user.update({ token });
  res.status(200).json({ token });
});
