import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import PostModel from '../../models/post.model';
import { createParam, createReq, createRes } from '../../types/postEndpoints';

// route:   POST /post
// access:  logged-user
export const create: RequestHandler<createParam, createRes, createReq> = asyncHandler(
  async (req, res) => {
    const post = await PostModel.create({
      desc: req.body.desc,
      userId: res.locals.userId,
    });
    res.status(200).json({ post });
  }
);
