import * as P from "../handlers/post";
import { protect } from "../middlewares/protect";
import { Router } from "express";

const router = Router();
router.route("/").post(protect, P.create).get(P.show);
router
  .route("/:postId")
  .delete(protect, P.remove)
  .patch(protect, P.update)
  .get(P.get);
export default router;
