import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import LikeModel from '../../models/like.model';
import PostModel from '../../models/post.model';

// route:   post /post/:postId/dislike
// access:  logged-user
export const dislike = asyncHandler(async (req, res, next) => {
  const post = await PostModel.findByPk(req.params.postId);
  if (!post) return next(new ApiError('post not found', 400));
  // check if post already disliked
  const like = await LikeModel.findOne({
    where: { userId: res.locals.userId, postId: req.params.postId },
  });
  if (!like) return next(new ApiError('already disliked this post', 400));
  await like.destroy();
  res.sendStatus(200);
});
