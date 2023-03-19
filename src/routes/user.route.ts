import { Router } from 'express';

import * as U from '../handlers/user';
import { protect } from '../middlewares/protect';
import { resizeImage, uploadImage } from '../middlewares/uploadImage';

const router = Router();
router.route('/signin').post(U.signin);
router.route('/signup').post(U.signup);
router.route('/signout').post(protect, U.signout);
router.route('/users').get(protect, U.show);
router.route('/profile/reset-password').put(protect, U.resetPassword);
router
  .route('/profile/update-profile-image')
  .put(protect, uploadImage, resizeImage, U.updateProfileImg);
router.route('/profile/block-list').get(protect, U.blockList);
router.route('/profile/follow-list').get(protect, U.followingList);
router.route('/profile/follower-list').get(protect, U.followersList);
router.route('/profile/view-list').get(protect, U.viewersList);
router.route('/:userId').get(protect, U.get);
router.route('/:userId/follow').post(protect, U.follow);
router.route('/:userId/unfollow').post(protect, U.unfollow);
router.route('/:userId/block').post(protect, U.block);
router.route('/:userId/unblock').post(protect, U.unblock);
router.route('/:userId/role').put(protect, U.updateUserRole);

export default router;
