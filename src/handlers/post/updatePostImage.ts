import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import PostModel from '../../models/post.model';
import { updatePostImgParam, updatePostImgReq, updatePostImgRes } from '../../types/postEndpoints';

// route:   PUT /:postId/image
// access:  logged-user
export const updatePostImg: RequestHandler<updatePostImgParam, updatePostImgRes, updatePostImgReq> =
  asyncHandler(async (req, res, next) => {
    if (!req.file) return next(new ApiError('image is required', 400));
    const post = await PostModel.update(
      { image: req.body.image },
      { where: { id: req.params.postId } }
    );
    if (!post) return next(new ApiError('post not found', 400));
    res.sendStatus(200);
  });
