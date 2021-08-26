import { Router } from "express";
import AuthController from "../controllers/auth";
import { AuthValidator } from "../middlewares/validators/user/validation";

const router = Router();

function authRouter(root) {
  root.use("/auth", router);

  router.post("/signup", AuthValidator.signUp, AuthController.signUp);
  router.post("/signin", AuthController.signIn);
  router.post("/email", AuthValidator.postEmail, AuthController.postEmail);
  router.put("/email", AuthController.putEmail);
  router.post("/password", AuthController.postPassword);
}

export default authRouter;
