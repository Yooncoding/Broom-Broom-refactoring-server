import express from "express";
import routes from "../api/routes";
import config from "../config";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import logger from "../utils/logger";
import CustomError from "../utils/errorhandle";
import passport from "passport";
import passportConfig from "../utils/passport";

export default (app, sequelizeSession) => {
  // session option
  passportConfig();

  // middleware
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser(config.secret));
  app.use(sequelizeSession);
  app.use(passport.initialize());
  app.use(passport.session());

  // router
  app.use(config.api.prefix, routes());
  app.use("/favicon.ico", (req, res) => res.status(204));
  app.use((req, res, next) => {
    const error = new CustomError("NOT_FOUND", 404, "페이지를 찾을 수 없습니다.");
    next(error);
  });

  // error handler
  app.use((err, req, res, next) => {
    logger.error(err);
    res.status(err.status || 500).json({ success: false, message: err.message });
  });
  logger.info("✌️ EXPRESS LOADED");
};
