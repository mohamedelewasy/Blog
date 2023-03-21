import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import CommentModel from '../../models/comment.model';
import PostModel from '../../models/post.model';
import { createParam, createReq, createRes } from '../../types/commentEndpoints';

// route:   POST /post/postId/comment
// access:  logged-user
export const create: RequestHandler<createParam, createRes, createReq> = asyncHandler(
  async (req, res, next) => {
    const post = await PostModel.findByPk(req.params.postId);
    if (!post) return next(new ApiError('post not found', 400));
    await CommentModel.create({
      comment: req.body.comment.trim(),
      postId: req.params.postId,
      userId: res.locals.userId,
    });
    res.sendStatus(200);
  }
);
