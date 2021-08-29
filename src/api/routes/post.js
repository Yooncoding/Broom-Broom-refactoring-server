import { Router } from "express";
import PostController from "../controllers/post";
import auth from "../middlewares/auth/authorization";

const router = Router();

function postRouter(root) {
  root.use("/posts", router);

  router.use(auth.isAuthenticated);
  router.get("/:postId", PostController.getPosts);
  router.delete("/:postId");
  router.get("/:postId/edit");
  router.post("/:postId/edit");
  router.get("/search");
  router.post("/new");
}

export default postRouter;
