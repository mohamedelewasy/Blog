import { Router } from 'express';

import * as P from '../handlers/post';
import { protect } from '../middlewares/protect';

const router = Router();
router.route('/').post(protect, P.create).get(P.show);
router.route('/:postId').delete(protect, P.remove).patch(protect, P.update).get(P.get);
router.route('/:postId/likers').get(protect, P.likersList);
router.route('/:postId/like').post(protect, P.like);
router.route('/:postId/dislike').post(protect, P.dislike);
export default router;
