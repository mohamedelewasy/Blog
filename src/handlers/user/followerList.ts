import FollowModel from "../../models/follow.model";
import UserModel from "../../models/user.model";
import asyncHandler from "express-async-handler";

// route:   GET /profile/follower-list
// access:  logged-user
export const followersList = asyncHandler(async (req, res, next) => {
  const list = await FollowModel.findAll({
    where: { followId: res.locals.userId },
    attributes: [],
    include: [
      {
        model: UserModel,
        as: "Follower",
        attributes: ["id", "firstName", "lastName", "profileImage"],
      },
    ],
  });
  res.status(200).json({ count: list.length, list: list });
});
