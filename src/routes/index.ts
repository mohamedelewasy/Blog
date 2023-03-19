import { Router } from 'express';

import postRoutes from './post.route';
import userRoutes from './user.route';

const router = Router();
router.use('/post', postRoutes);
router.use('/auth', userRoutes);

export default router;
