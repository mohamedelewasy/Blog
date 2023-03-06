import ApiError from "../../errors/ApiError";
import BlockModel from "../../models/block.model";
import FollowModel from "../../models/follow.model";
import UserModel from "../../models/user.model";
import asyncHandler from "express-async-handler";

// route:   POST /:userId/follow
// access:  logged-user
export const follow = asyncHandler(async (req, res, next) => {
  // user cannot follow himself
  if (res.locals.userId == req.params.userId)
    return next(new ApiError("cannot follow your self", 400));
  const targetUser = await UserModel.findByPk(req.params.userId, {
    attributes: ["id"],
  });
  if (!targetUser) return next(new ApiError("user not found", 400));
  // user cannot follow blocked user
  if (
    await BlockModel.findOne({
      where: { userId: res.locals.userId, blockedId: targetUser.id },
    })
  )
    return next(new ApiError("cannot follow blocked user", 400));
  if (
    await FollowModel.findOne({
      where: { userId: res.locals.userId, followId: targetUser.id },
    })
  )
    // assert logged user not following target user
    return next(new ApiError("already follow this user", 400));
  await FollowModel.create({
    userId: res.locals.userId,
    followId: targetUser.id,
  });
  res.sendStatus(200);
});
