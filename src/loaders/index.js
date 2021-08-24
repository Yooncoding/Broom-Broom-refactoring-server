import expressLoader from "./express";
import sequelizeLoader from "./sequelize";
import sessionLoader from "./session";

export default async (app) => {
  // sequelize sync
  const sequelize = await sequelizeLoader();

  // session db store with connecting sequelize
  const sequelizeSession = sessionLoader(sequelize);

  // express loader
  expressLoader(app, sequelizeSession);
};
