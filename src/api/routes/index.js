import { Router } from "express";
import authRouter from "./auth";
import userRouter from "./user";
import addressRouter from "./address";
import postRouter from "./post";
import mainRouter from "./main";
import historyRouter from "./history";
import adminRouter from "./admin";

const rootRouter = Router();

export default () => {
  mainRouter(rootRouter);
  authRouter(rootRouter);
  userRouter(rootRouter);
  addressRouter(rootRouter);
  postRouter(rootRouter);
  historyRouter(rootRouter);
  adminRouter(rootRouter);

  return rootRouter;
};
