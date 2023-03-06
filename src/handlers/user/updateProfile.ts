import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import UserModel from '../../models/user.model';

// route:   PUT /reset-profile
// access:  logged-user
export const updateProfile = asyncHandler(async (req, res, next) => {
  if (!req.file) return next(new ApiError('profileImage is required', 400));
  await UserModel.update(
    { profileImage: req.body.profileImage },
    { where: { id: res.locals.userId } }
  );
  res.sendStatus(200);
});
