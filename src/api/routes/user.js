import { Router } from "express";
import UserController from "../controllers/user";
import auth from "../middlewares/auth/authorization";
import { userImageUpoad } from "../middlewares/multer";
import { UserValidator } from "../middlewares/validators/user/validation";

const router = Router();

function userRouter(root) {
  root.use("/users", router);

  router.use(auth.isAuthenticated);

  router.get("/me", UserController.getMe);
  router.get("/me/posts", UserValidator.getUserPosts, UserController.getMePosts);
  router.put("/me/image", userImageUpoad.single("image"), UserController.putImage);
  router.delete("/me/image", UserController.deleteImage);
  router.get("/me/edit", UserController.getEdit);
  router.post("/me/edit", UserValidator.postEdit, UserController.postEdit);
  router.get("/me/point", UserController.getPoint);
  router.post("/me/point", UserValidator.postPoint, UserController.postPoint);
  router.get("/:userId/intro", UserController.getIntro);
  router.get("/:userId/posts", UserValidator.getUserPosts, UserController.getUserPosts);
}

export default userRouter;
