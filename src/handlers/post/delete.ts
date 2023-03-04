import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import PostModel from '../../models/post.model';

// route:   DELETE /post/:postId
// access:  logged-user
export const remove = asyncHandler(async (req, res, next) => {
  const post = await PostModel.findByPk(req.params.postId);
  if (!post) return next(new ApiError('post not found', 400));
  if (post.userId != res.locals.userId) return next(new ApiError('access denied', 401));
  await post.destroy();
  res.sendStatus(200);
});
