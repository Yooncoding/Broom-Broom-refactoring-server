import { Router } from "express";
import authRouter from "./auth";
import userRouter from "./user";
import addressRouter from "./address";

const rootRouter = Router();

export default () => {
  authRouter(rootRouter);
  userRouter(rootRouter);
  addressRouter(rootRouter);

  return rootRouter;
};
