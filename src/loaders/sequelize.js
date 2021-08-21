import * as DB from "../models";
import logger from "../utils/logger";

export default async () => {
  const sequelize = DB.init();
  await sequelize
    .sync({ force: false })
    .then(() => {
      logger.info("################################################");
      logger.info("✌️ SEQUELIZE LOADED");
    })
    .catch((err) => {
      logger.error(err);
    });
};
