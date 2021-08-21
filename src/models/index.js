import Sequelize from "sequelize";
import config from "../config";
import User from "./User";
import Post from "./Post";

export function init() {
  const sequelize = new Sequelize(config.database, config.username, config.password, config.db);
  // init
  User.init(sequelize);
  Post.init(sequelize);

  // asscociate
  User.hasMany(Post, { foreignKey: "sellerId", targetKey: "id" });
  Post.belongsTo(User, { foreignKey: "sellerId", targetKey: "id" });

  return sequelize;
}
