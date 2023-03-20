import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import BlockModel from '../../models/block.model';
import UserModel from '../../models/user.model';
import { IncludedUser } from '../../types/schema';
import { blockListParam, blockListReq } from '../../types/userEndpoints';

// route:   GET /profile/block-list
// access:  logged-user / admin
export const blockList: RequestHandler<blockListParam, unknown, blockListReq> = asyncHandler(
  async (req, res) => {
    // if logged-user is admin
    const loggedUser = await UserModel.findByPk(res.locals.userId, { attributes: ['isAdmin'] });
    if (loggedUser?.isAdmin) {
      const list = await UserModel.findAll({
        where: { isBlocked: true },
        attributes: IncludedUser,
      });
      res.status(200).json({ count: list.length, list });
    }

    const list = await BlockModel.findAll({
      where: { userId: res.locals.userId },
      attributes: [],
      include: [
        {
          model: UserModel,
          as: 'blocking',
          attributes: IncludedUser,
        },
      ],
    });
    res.status(200).json({ count: list.length, list });
  }
);
