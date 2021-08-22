import { Router } from "express";
import AuthController from "../controllers/auth";
import AuthValidator from "../middlewares/validators/auth/validation";

const router = Router();

function authRouter(root) {
  root.use("/auth", router);

  router.post("/signup", AuthValidator.signup, AuthController.signUp);
}

export default authRouter;
