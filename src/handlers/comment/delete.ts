import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import CommentModel from '../../models/comment.model';
import { removeParam, removeReq, removeRes } from '../../types/commentEndpoints';

// route:   DELETE /post/:postId/comment/:commentId
// access:  logged-user
export const remove: RequestHandler<removeParam, removeRes, removeReq> = asyncHandler(
  async (req, res, next) => {
    const comment = await CommentModel.destroy({
      where: { postId: req.params.postId, userId: res.locals.userId, id: req.params.commentId },
    });
    if (!comment) return next(new ApiError('comment not founds', 400));
    res.sendStatus(200);
  }
);
