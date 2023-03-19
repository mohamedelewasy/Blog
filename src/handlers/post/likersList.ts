import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import LikeModel from '../../models/like.model';
import PostModel from '../../models/post.model';
import UserModel from '../../models/user.model';
import { likersListParam, likersListReq } from '../../types/postEndpoints';
import { IncludedUser } from '../../types/schema';

// route:   get /post/:postId/likers
// access:  logged-user
export const likersList: RequestHandler<likersListParam, unknown, likersListReq> = asyncHandler(
  async (req, res, next) => {
    const post = await PostModel.findByPk(req.params.postId);
    if (!post) return next(new ApiError('post not found', 400));
    const list = await LikeModel.findAll({
      where: { postId: req.params.postId },
      attributes: [],
      include: [{ model: UserModel, attributes: IncludedUser }],
    });
    res.status(200).json({ count: list.length, list });
  }
);
