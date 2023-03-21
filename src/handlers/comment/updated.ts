import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import CommentModel from '../../models/comment.model';
import { updateParam, updateReq, updateRes } from '../../types/commentEndpoints';

// route:   PUT /post/:postId/comment/:commentId
// access:  logged-user
export const update: RequestHandler<updateParam, updateRes, updateReq> = asyncHandler(
  async (req, res, next) => {
    const comment = await CommentModel.update(
      { comment: req.body.comment },
      {
        where: { postId: req.params.postId, userId: res.locals.userId, id: req.params.commentId },
        validate: true,
      }
    );
    if (!comment) return next(new ApiError('comment not founds', 400));
    res.sendStatus(200);
  }
);
