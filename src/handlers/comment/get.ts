import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import CommentModel from '../../models/comment.model';
import UserModel from '../../models/user.model';

// route:   get /post/:postId/comment/:commentId
// access:  logged-user
export const get = asyncHandler(async (req, res, next) => {
  const comment = await CommentModel.findOne({
    where: { id: req.params.commentId, postId: req.params.postId },
    attributes: ['id', 'comment', 'updatedAt'],
    include: { model: UserModel, attributes: ['id', 'firstName', 'lastName', 'profileImage'] },
  });
  if (!comment) return next(new ApiError('comment not founds', 400));
  res.status(200).json({ comment });
});
