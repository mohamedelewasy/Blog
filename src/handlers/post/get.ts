import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import PostModel from '../../models/post.model';
import UserModel from '../../models/user.model';
import { getParam, getReq, getRes } from '../../types/postEndpoints';
import { IncludedUser } from '../../types/schema';

// route:   GET /post/:postId
// access:  logged-user
export const get: RequestHandler<getParam, getRes, getReq> = asyncHandler(
  async (req, res, next) => {
    const post = await PostModel.findByPk(req.params.postId, {
      include: [{ model: UserModel, attributes: IncludedUser }],
    });
    if (!post) return next(new ApiError('post not found', 400));

    res.status(200).json({ post });
  }
);
