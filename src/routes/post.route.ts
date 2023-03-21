import { Router } from 'express';

import * as C from '../handlers/comment';
import * as P from '../handlers/post';
import { protect } from '../middlewares/protect';

// TODO: create post with image
// TODO: get post image
const router = Router();
router.route('/').post(protect, P.create).get(P.show);
router.route('/:postId').delete(protect, P.remove).patch(protect, P.update).get(P.get);
router.route('/:postId/likers').get(protect, P.likersList);
router.route('/:postId/like').post(protect, P.like);
router.route('/:postId/dislike').post(protect, P.dislike);
// comments
router.route('/:postId/comment').post(protect, C.create).get(protect, C.show);
router
  .route('/:postId/comment/:commentId')
  .get(protect, C.get)
  .put(protect, C.update)
  .delete(protect, C.remove);

export default router;
