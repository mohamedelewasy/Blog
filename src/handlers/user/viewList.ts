import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import UserModel from '../../models/user.model';
import ViewModel from '../../models/view.model';
import { IncludedUser } from '../../types/schema';
import { viewersListParam, viewersListReq } from '../../types/userEndpoints';

// route:   GET /profile/viewers
// access:  logged-user
export const viewersList: RequestHandler<viewersListParam, unknown, viewersListReq> = asyncHandler(
  async (req, res) => {
    const list = await ViewModel.findAll({
      where: { viewId: res.locals.userId },
      attributes: [],
      include: [
        {
          model: UserModel,
          as: 'viewers',
          attributes: IncludedUser,
        },
      ],
    });
    res.status(200).json({ count: list.length, list: list });
  }
);
