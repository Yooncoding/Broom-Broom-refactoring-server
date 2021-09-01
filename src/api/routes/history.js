import { Router } from "express";
import auth from "../middlewares/auth/authorization";
import HistoryController from "../controllers/history";
import { HistoryValidator } from "../middlewares/validators/post/validation";

const router = Router();

function histroyRouter(root) {
  root.use("/usage-history", router);

  router.use(auth.isAuthenticated);
  router.get("/", HistoryValidator.getHistoryPosts, HistoryController.getHistory);
  router.post("/review/:postId", HistoryValidator.postReviewPost, HistoryController.postReview);
}

export default histroyRouter;
