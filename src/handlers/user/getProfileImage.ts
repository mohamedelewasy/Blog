import { RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import path from 'path';

import { __BASEdIRECTORY } from '../../app';
import ApiError from '../../errors/ApiError';
import UserModel from '../../models/user.model';
import { getProfileImgParam, getProfileImgReq, getProfileImgRes } from '../../types/userEndpoints';

// route:   GET /profile-image
// access:  logged-user
export const getProfileImg: RequestHandler<getProfileImgParam, getProfileImgRes, getProfileImgReq> =
  asyncHandler(async (req, res, next) => {
    const user = await UserModel.findByPk(res.locals.userId, { attributes: ['profileImage'] });
    if (user && user.profileImage)
      res.status(200).json({
        image: path.join(__BASEdIRECTORY, '/uploads/profiles', user.profileImage),
      });
    else return next(new ApiError('profile image not found', 400));
  });
