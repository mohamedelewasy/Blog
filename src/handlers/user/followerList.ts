import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import FollowModel from '../../models/follow.model';
import UserModel from '../../models/user.model';
import { followListParam, followListReq } from '../../types/userEndpoints';

// route:   GET /profile/follower-list
// access:  logged-user
export const followersList: RequestHandler<followListParam, unknown, followListReq> = asyncHandler(
  async (req, res) => {
    const list = await FollowModel.findAll({
      where: { followId: res.locals.userId },
      attributes: [],
      include: [
        {
          model: UserModel,
          as: 'Follower',
          attributes: ['id', 'firstName', 'lastName', 'profileImage'],
        },
      ],
    });
    res.status(200).json({ count: list.length, list: list });
  }
);
