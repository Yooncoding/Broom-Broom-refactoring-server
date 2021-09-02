import express from "express";
import config from "./config";
import loader from "./loaders";
import logger from "./utils/logger";
import swaggerUI from "swagger-ui-express";
import swagger from "../swagger.json";

async function startServer() {
  const app = express();

  // API document
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swagger, { explorer: true }));
  logger.info(`✌️ API DOCS -> http://${config.hostname}:${config.port}/api-docs`);

  // loader
  await loader(app);

  app
    .listen(config.port, () => {
      logger.info(`
        ##############################################
        🛡️  Server listening on port: ${config.port} 🛡️
        ##############################################
    `);
    })
    .on("error", (err) => {
      logger.error(err);
      process.exit(1);
    });
}

startServer();
