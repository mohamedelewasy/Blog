import postRoutes from "./post.route";
import userRoutes from "./user.route";
import { Router } from "express";

const router = Router();
router.use("/post", postRoutes);
router.use("/auth", userRoutes);

export default router;
