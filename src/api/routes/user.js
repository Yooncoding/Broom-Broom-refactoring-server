import { Router } from "express";
import auth from "../middlewares/auth/authorization";

const router = Router();

function userRouter(root) {
  root.use("/users", router);

  router.use(auth.isAuthenticated);

  router.get("/me");
  router.get("/me/posts");
  router.delete("/me/image");
  router.get("/me/edit");
  router.post("/me/edit");
  router.get("/me/point");
  router.post("/me/point");
  router.get("/:userId/intro");
  router.get("/:userId/posts");
}

export default userRouter;
