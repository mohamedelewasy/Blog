import asyncHandler from 'express-async-handler';

import ApiError from '../../errors/ApiError';
import BlockModel from '../../models/block.model';
import FollowModel from '../../models/follow.model';
import UserModel from '../../models/user.model';

// route:   POST /:userId/block
// access:  logged-user / admin
export const block = asyncHandler(async (req, res, next) => {
  // user cannot block himself
  if (res.locals.userId === req.params.userId)
    return next(new ApiError('cannot block your self', 400));
  const targetUser = await UserModel.findByPk(req.params.userId, { attributes: ['id'] });
  if (!targetUser) return next(new ApiError('user not found', 400));
  // if logged-user is admin
  const loggedUser = await UserModel.findByPk(res.locals.userId, { attributes: ['isAdmin'] });
  if (loggedUser?.isAdmin) {
    await targetUser.update({ isBlocked: true });
    res.sendStatus(200);
    return;
  }
  // remove target user from follow if exists
  await FollowModel.destroy({ where: { userId: res.locals.userId, followId: targetUser.id } });
  // assert logged user not unblocked target user
  if (await BlockModel.findOne({ where: { userId: res.locals.userId, blockedId: targetUser.id } }))
    return next(new ApiError('already block this user', 400));
  await BlockModel.create({ userId: res.locals.userId, blockedId: targetUser.id });
  res.sendStatus(200);
});
