import asyncHandler from 'express-async-handler';

import PostModel from '../../models/post.model';
import UserModel from '../../models/user.model';

// route:   GET /post
// access:  logged-user
export const show = asyncHandler(async (req, res, next) => {
  const limit = +(req.query.limit || 10);
  const page = +(req.query.page || 1);
  const offset = (page - 1) * limit;
  const list = await PostModel.findAll({
    limit,
    offset,
    order: [['updatedAt', 'DESC']],
    include: [{ model: UserModel, attributes: ['id', 'firstName', 'lastName', 'profileImage'] }],
  });
  res.status(200).json({ list });
});
