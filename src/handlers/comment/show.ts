import asyncHandler from 'express-async-handler';

import CommentModel from '../../models/comment.model';
import UserModel from '../../models/user.model';

// route:   get /post/:postId/comment
// access:  logged-user
export const show = asyncHandler(async (req, res) => {
  const comments = await CommentModel.findAll({
    where: { postId: req.params.postId },
    attributes: ['id', 'comment', 'updatedAt'],
    include: { model: UserModel, attributes: ['id', 'firstName', 'lastName', 'profileImage'] },
  });
  res.status(200).json({ comments });
});
