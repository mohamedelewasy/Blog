import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import LikeModel from '../../models/like.model';
import PostModel from '../../models/post.model';
import UserModel from '../../models/user.model';

// route:   get /post/:postId/likers
// access:  logged-user
export const likersList = asyncHandler(async (req, res, next) => {
  const post = await PostModel.findByPk(req.params.postId);
  if (!post) return next(new ApiError('post not found', 400));
  const list = await LikeModel.findAll({
    where: { postId: req.params.postId },
    attributes: [],
    include: [{ model: UserModel, attributes: ['id', 'firstName', 'lastName', 'profileImage'] }],
  });
  res.status(200).json({ list });
});
