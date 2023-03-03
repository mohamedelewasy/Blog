import { Router } from 'express';

import userRoutes from './user.route';

const router = Router();
router.use(userRoutes);

export default router;
