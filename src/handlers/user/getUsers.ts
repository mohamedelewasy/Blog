import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import { Op } from 'sequelize';

import UserModel from '../../models/user.model';
import { IncludedUser } from '../../types/schema';
import { showParam, showReq, showRes } from '../../types/userEndpoints';

// route:   GET /users
// access:  logged-user
// TODO: create virual column name to search in full name
export const show: RequestHandler<showParam, showRes, showReq> = asyncHandler(async (req, res) => {
  const limit = +(req.query.limit || 10);
  const page = +(req.query.page || 1);
  const offset = (page - 1) * limit;
  const list = await UserModel.findAll({
    where: {
      [Op.or]: [{ firstName: { [Op.like]: req.query.name } }, { email: req.query.email }],
    },
    attributes: IncludedUser,
    limit,
    offset,
  });
  res.status(200).json({ list });
});
