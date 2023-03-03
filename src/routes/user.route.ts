import { Router } from 'express';

import { follow, resetPassword, signin, signout, signup, unfollow } from '../handlers/user';
import { protect } from '../middlewares/protect';

const router = Router();
router.route('/signin').post(signin);
router.route('/signup').post(signup);
router.route('/signout').post(protect, signout);
router.route('/reset-password').put(protect, resetPassword);
router.route('/:userId/follow').post(protect, follow);
router.route('/:userId/unfollow').post(protect, unfollow);

export default router;
