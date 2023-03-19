import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import FollowModel from '../../models/follow.model';
import UserModel from '../../models/user.model';
import { followParam, followReq, followRes } from '../../types/userEndpoints';

// route:   POST /:userId/unfollow
// access:  logged-user
export const unfollow: RequestHandler<followParam, followRes, followReq> = asyncHandler(
  async (req, res, next) => {
    // user cannot unfollow himself
    if (res.locals.userId === req.params.userId)
      return next(new ApiError('cannot unfollow your self', 400));
    const targetUser = await UserModel.findByPk(req.params.userId, { attributes: ['id'] });
    if (!targetUser) return next(new ApiError('user not found', 400));
    // assert logged user following target user
    const follow = await FollowModel.findOne({
      where: { userId: res.locals.userId, followId: targetUser.id },
    });
    if (!follow) return next(new ApiError('already unfollow this user', 400));
    await follow.destroy();
    res.sendStatus(200);
  }
);
