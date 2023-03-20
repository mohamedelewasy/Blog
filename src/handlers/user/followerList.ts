import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import FollowModel from '../../models/follow.model';
import UserModel from '../../models/user.model';
import { followersListParam, followersListReq } from '../../types/userEndpoints';

// route:   GET /profile/follower-list
// access:  logged-user
export const followersList: RequestHandler<followersListParam, unknown, followersListReq> =
  asyncHandler(async (req, res) => {
    const list = await FollowModel.findAll({
      where: { followId: res.locals.userId },
      attributes: [],
      include: [
        {
          model: UserModel,
          as: 'follower',
          attributes: ['id', 'firstName', 'lastName', 'profileImage'],
        },
      ],
    });
    res.status(200).json({ count: list.length, list: list });
  });
