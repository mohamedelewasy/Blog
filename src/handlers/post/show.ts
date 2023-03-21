import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import PostModel from '../../models/post.model';
import UserModel from '../../models/user.model';
import { showParam, showReq } from '../../types/postEndpoints';
import { IncludedUser } from '../../types/schema';

// route:   GET /post
// access:  logged-user
export const show: RequestHandler<showParam, unknown, showReq> = asyncHandler(async (req, res) => {
  const limit = +(req.query.limit || 10);
  const page = +(req.query.page || 1);
  const offset = (page - 1) * limit;
  const list = await PostModel.findAll({
    limit,
    offset,
    order: [['updatedAt', 'DESC']],
    include: [{ model: UserModel, attributes: IncludedUser }],
  });
  res.status(200).json({ count: list.length, list });
});
