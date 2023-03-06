import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
// import LikeModel from '../../models/like.model';
// import PostModel from '../../models/post.model';
import { BlockModel, FollowModel, LikeModel, PostModel, UserModel } from '../../models';

// route:   post /post/:postId/like
// access:  logged-user
export const like = asyncHandler(async (req, res, next) => {
  const post = await PostModel.findByPk(req.params.postId);
  if (!post) return next(new ApiError('post not found', 400));
  // check if post already liked
  const like = await LikeModel.findOne({
    where: { userId: res.locals.userId, postId: req.params.postId },
  });
  if (like) return next(new ApiError('already liked this post', 400));
  await LikeModel.create({ userId: res.locals.userId, postId: req.params.postId });
  res.sendStatus(200);
});
