import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import UserModel from '../../models/user.model';
import { resetPasswordParam, resetPasswordReq, resetPasswordRes } from '../../types/userEndpoints';
import { comparePassword, hashPassword } from '../../utils/password.util';
import { generateToken } from '../../utils/token.util';

// route:   PUT /reset-password
// access:  logged-user
export const resetPassword: RequestHandler<resetPasswordParam, resetPasswordRes, resetPasswordReq> =
  asyncHandler(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const user = await UserModel.findByPk(res.locals.userId, { attributes: ['id', 'password'] });
    if (!user) throw new Error(); // to pass typescript check
    if (!comparePassword(oldPassword, user.password))
      return next(new ApiError('incorrect password', 400));
    if (newPassword.length < 6) return next(new ApiError('password must be 6 or greater', 400));
    const hashedPassword = hashPassword(newPassword);
    const token = generateToken(user.id);
    await user.update({ password: hashedPassword, token }, { validate: true });
    res.status(200).json({ token });
  });
