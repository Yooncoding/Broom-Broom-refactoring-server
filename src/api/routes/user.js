import { Router } from "express";
import UserController from "../controllers/user";
import auth from "../middlewares/auth/authorization";

const router = Router();

function userRouter(root) {
  root.use("/users", router);

  router.use(auth.isAuthenticated);

  router.get("/me", UserController.getMe);
  router.get("/me/posts");
  router.delete("/me/image");
  router.get("/me/edit", UserController.getEdit);
  router.post("/me/edit", UserController.postEdit);
  router.get("/me/point", UserController.getPoint);
  router.post("/me/point");
  router.get("/:userId/intro", UserController.getIntro);
  router.get("/:userId/posts");
}

export default userRouter;
