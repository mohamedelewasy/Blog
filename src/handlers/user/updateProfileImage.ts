import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import UserModel from '../../models/user.model';
import {
  updateProfileImgParam,
  updateProfileImgReq,
  updateProfileImgRes,
} from '../../types/userEndpoints';

// route:   PUT /profile-image
// access:  logged-user
export const updateProfileImg: RequestHandler<
  updateProfileImgParam,
  updateProfileImgRes,
  updateProfileImgReq
> = asyncHandler(async (req, res, next) => {
  if (!req.file) return next(new ApiError('profileImage is required', 400));
  await UserModel.update(
    { profileImage: req.body.profileImage },
    { where: { id: res.locals.userId } }
  );
  res.sendStatus(200);
});
