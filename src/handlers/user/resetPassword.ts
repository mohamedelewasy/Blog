import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import UserModel from '../../models/user.model';
import { comparePassword, hashPassword } from '../../utils/password.util';
import { generateToken } from '../../utils/token.util';

// route:   PUT /reset-password
// access:  logged-user
export const resetPassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword, confirmationPassword } = req.body;
  if (newPassword != confirmationPassword)
    return next(new ApiError('password and confirm password are not equal', 400));
  const user = await UserModel.findByPk(res.locals.userId, { attributes: ['id', 'password'] });
  if (!user || !comparePassword(oldPassword, user.password))
    return next(new ApiError('incorrect password', 400));
  const hashedPassword = hashPassword(newPassword);
  const token = generateToken(user.id);
  await user.update({ password: hashedPassword, token }, { validate: true });
  res.status(200).json({ token });
});
