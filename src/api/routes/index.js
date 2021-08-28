import { Router } from "express";
import authRouter from "./auth";
import userRouter from "./user";
import addressRouter from "./address";
import postRouter from "./post";

const rootRouter = Router();

export default () => {
  authRouter(rootRouter);
  userRouter(rootRouter);
  addressRouter(rootRouter);
  postRouter(rootRouter);

  return rootRouter;
};
