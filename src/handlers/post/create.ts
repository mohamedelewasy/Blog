import asyncHandler from 'express-async-handler';

import PostModel from '../../models/post.model';

// route:   POST /post
// access:  logged-user
export const create = asyncHandler(async (req, res, next) => {
  const post = await PostModel.create({
    desc: req.body.desc || null,
    image: req.body.image || null,
    userId: res.locals.userId,
  });
  res.status(200).json({ post });
});
