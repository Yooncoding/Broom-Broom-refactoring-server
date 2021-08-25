import { Router } from "express";
import authRouter from "./auth";
import userRouter from "./user";

const rootRouter = Router();

export default () => {
  authRouter(rootRouter);
  userRouter(rootRouter);

  return rootRouter;
};
