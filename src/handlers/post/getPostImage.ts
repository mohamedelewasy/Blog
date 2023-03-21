import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import path from 'path';

import { __BASEdIRECTORY } from '../../app';
import ApiError from '../../errors/ApiError';
import PostModel from '../../models/post.model';
import { getPostImgParam, getPostImgReq, getPostImgRes } from '../../types/postEndpoints';

// route:   GET /:postId/image
// access:  logged-user
export const getPostImg: RequestHandler<getPostImgParam, getPostImgRes, getPostImgReq> =
  asyncHandler(async (req, res, next) => {
    const post = await PostModel.findByPk(req.params.postId, { attributes: ['image'] });
    if (post && post.image)
      res.status(200).json({
        image: path.join(__BASEdIRECTORY, '/uploads/posts', post.image),
      });
    else return next(new ApiError('image not found', 400));
  });
