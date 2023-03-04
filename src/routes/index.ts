import { Router } from 'express';

import postRoutes from './post.route';
import userRoutes from './user.route';

const router = Router();
router.use(postRoutes);
router.use(userRoutes);

export default router;
