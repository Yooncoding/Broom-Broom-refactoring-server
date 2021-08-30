import { Router } from "express";
import MainController from "../controllers/main";
import { MainValidator } from "../middlewares/validators/post/validation";
import auth from "../middlewares/auth/authorization";

const router = Router();

function mainRouter(root) {
  root.use("/", router);

  router.use(auth.isAuthenticated);
  router.get("/", MainValidator.getMainPosts, MainController.getMain);
}

export default mainRouter;
