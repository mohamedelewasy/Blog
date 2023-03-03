import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import BlockModel from '../../models/block.model';
import UserModel from '../../models/user.model';

// route:   POST /:userId/unblock
// access:  logged-user
export const unblock = asyncHandler(async (req, res, next) => {
  // user cannot unblock himself
  if (res.locals.userId === req.params.userId)
    return next(new ApiError('cannot unblock your self', 400));
  const targetUser = await UserModel.findByPk(req.params.userId, { attributes: ['id'] });
  if (!targetUser) return next(new ApiError('user not found', 400));
  // assert logged user blocked target user
  const block = await BlockModel.findOne({
    where: { userId: res.locals.userId, blockedId: targetUser.id },
  });
  if (!block) return next(new ApiError('already unblocked this user', 400));
  await block.destroy();
  res.sendStatus(200);
});
