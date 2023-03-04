import { Router } from 'express';

import * as P from '../handlers/post';
import { protect } from '../middlewares/protect';

const router = Router();
router.route('/post').post(protect, P.create).get(P.show);
router.route('/post/:postId').delete(protect, P.remove).patch(protect, P.update).get(P.get);
export default router;
