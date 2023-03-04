import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import UserModel from '../../models/user.model';
import ViewModel from '../../models/view.model';

// route:   GET /:userId
// access:  logged-user
// TODO: send followers and following count in response
export const get = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findByPk(req.params.userId, {
    attributes: ['id', 'firstName', 'lastName', 'profileImage'],
  });
  if (!user) return next(new ApiError('user not found', 400));
  // user cannot view himself
  if (res.locals.userId != req.params.userId)
    await ViewModel.create({ userId: res.locals.userId, viewId: req.params.userId });
  res.status(200).json({ user });
});
