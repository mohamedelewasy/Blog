import { Router } from 'express';

import {
  block,
  blockList,
  follow,
  resetPassword,
  signin,
  signout,
  signup,
  unblock,
  unfollow,
} from '../handlers/user';
import { protect } from '../middlewares/protect';

const router = Router();
router.route('/signin').post(signin);
router.route('/signup').post(signup);
router.route('/signout').post(protect, signout);
router.route('/reset-password').put(protect, resetPassword);
router.route('/profile/block-list').get(protect, blockList);
router.route('/:userId/follow').post(protect, follow);
router.route('/:userId/unfollow').post(protect, unfollow);
router.route('/:userId/block').post(protect, block);
router.route('/:userId/unblock').post(protect, unblock);

export default router;
