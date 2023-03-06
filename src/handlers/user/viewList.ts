import asyncHandler from 'express-async-handler';

import UserModel from '../../models/user.model';
import ViewModel from '../../models/view.model';

// route:   GET /profile/viewers
// access:  logged-user
export const viewersList = asyncHandler(async (req, res, next) => {
  const list = await ViewModel.findAll({
    where: { viewId: res.locals.userId },
    attributes: [],
    include: [
      {
        model: UserModel,
        as: 'viewers',
        attributes: ['id', 'firstName', 'lastName', 'profileImage'],
      },
    ],
  });
  res.status(200).json({ count: list.length, list: list });
});
