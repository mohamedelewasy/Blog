import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import UserModel from '../../models/user.model';

// route:   PUT /:userId/role
// access:  admin
export const updateUserRole = asyncHandler(async (req, res, next) => {
  const loggedUser = await UserModel.findByPk(res.locals.userId, { attributes: ['isAdmin'] });
  if (!loggedUser?.isAdmin) return next(new ApiError('access denied', 401));
  const targetUser = await UserModel.findByPk(req.params.userId);
  if (!targetUser) return next(new ApiError('user not found', 400));
  const isAdmin: boolean = req.body.isAdmin;
  if (!isAdmin) return next(new ApiError('isAdmin is required', 400));
  await targetUser.update({ isAdmin }, { validate: true });
  res.sendStatus(200);
});
