import { Router } from "express";
import AuthController from "../controllers/auth";
import AuthValidators from "../middlewares/validators/auth/validation";
import AuthValidator from "../middlewares/validators/auth/validation";

const router = Router();

function authRouter(root) {
  root.use("/auth", router);

  router.post("/signup", AuthValidator.signUp, AuthController.signUp);
  router.post("/signin", AuthController.signIn);
  router.post("/email", AuthValidators.postEmail, AuthController.postEmail);
  router.put("/email", AuthController.putEmail);
}

export default authRouter;
