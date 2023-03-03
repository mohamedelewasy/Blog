import asyncHandler from 'express-async-handler';

import UserModel from '../../models/user.model';

// route:   POST /signout
// access:  public
export const signout = asyncHandler(async (req, res) => {
  await UserModel.update({ token: '' }, { where: { id: res.locals.userId } });
  req.headers.authorization = undefined;
  res.locals.userId = undefined;
  res.sendStatus(200);
});
