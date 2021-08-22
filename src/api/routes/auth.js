import { Router } from "express";
import AuthController from "../controllers/auth";

const router = Router();

function authRouter(root) {
  root.use("/auth", router);

  router.post("/signup", AuthController.signUp);
}

export default authRouter;
