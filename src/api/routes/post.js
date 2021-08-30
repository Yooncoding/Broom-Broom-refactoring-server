import { Router } from "express";
import PostController from "../controllers/post";
import auth from "../middlewares/auth/authorization";
import { postImageUpoad } from "../middlewares/multer";
import { PostValidator } from "../middlewares/validators/post/validation";

const router = Router();

function postRouter(root) {
  root.use("/posts", router);

  router.use(auth.isAuthenticated);
  router.get("/search", PostValidator.getSearch, PostController.getSearch);
  router.get("/:postId", PostController.getPost);
  router.delete("/:postId", PostController.deletePost);
  router.get("/:postId/edit", PostController.getEdit);
  router.post("/:postId/edit", postImageUpoad.array("images"), PostController.postEdit);
  router.post("/new", postImageUpoad.array("images"), PostController.postPost);
}

export default postRouter;
