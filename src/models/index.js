import Sequelize from "sequelize";
import config from "../config";
import User from "./User";
import Post from "./Post";
import UserAddress from "./UserAddress";
import PostImage from "./PostImage";
import ChatRoom from "./ChatRoom";
import ChatMessage from "./ChatMessage";
import District from "./District";
import Cog from "./Cog";

export function init() {
  const sequelize = new Sequelize(config.database, config.username, config.password, config.db);
  // init
  User.init(sequelize);
  Post.init(sequelize);
  UserAddress.init(sequelize);
  PostImage.init(sequelize);
  ChatRoom.init(sequelize);
  ChatMessage.init(sequelize);
  District.init(sequelize);
  Cog.init(sequelize);

  // asscociate
  User.hasMany(Post, { foreignKey: "sellerId", targetKey: "id" });
  Post.belongsTo(User, { foreignKey: "sellerId", targetKey: "id" });

  return sequelize;
}
