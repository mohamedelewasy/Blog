import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

import BlockModel from '../../models/block.model';
import UserModel from '../../models/user.model';

// route:   GET /profile/block-list
// access:  logged-user / admin
export const blockList = asyncHandler(async (req, res, next) => {
  // if logged-user is admin
  const loggedUser = await UserModel.findByPk(res.locals.userId, { attributes: ['isAdmin'] });
  if (loggedUser?.isAdmin) {
    const list = await UserModel.findAll({
      where: { isBlocked: true },
      attributes: ['id', 'firstName', 'lastName', 'profileName'],
    });
    res.status(200).json({ count: list.length, list });
  }

  const list = await BlockModel.findAll({
    where: { userId: res.locals.userId },
    attributes: [],
    include: [
      {
        model: UserModel,
        as: 'blockedUsers',
        attributes: ['id', 'firstName', 'lastName', 'profileImage'],
      },
    ],
  });
  res.status(200).json({ count: list.length, list: list });
});
