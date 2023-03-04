import asyncHandler from 'express-async-handler';

import FollowModel from '../../models/follow.model';
import UserModel from '../../models/user.model';

// route:   GET /profile/follow-list
// access:  logged-user
export const followingList = asyncHandler(async (req, res, next) => {
  const list = await FollowModel.findAll({
    where: { userId: res.locals.userId },
    attributes: [],
    include: [
      {
        model: UserModel,
        as: 'FollowingUsers',
        attributes: ['id', 'firstName', 'lastName', 'profileImage'],
      },
    ],
  });
  res.status(200).json({ count: list.length, list: list });
});
