import session from "express-session";
import config from "../config";

export default function sessionLoader(sequelize) {
  const SequelizeStore = require("connect-session-sequelize")(session.Store);

  const sessionMiddleware = session({
    ...config.sessionOption,
    store: new SequelizeStore({ db: sequelize }),
  });

  return sessionMiddleware;
}
