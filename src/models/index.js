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
import Session from "./Session";

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
  Session.init(sequelize);

  // associate
  User.hasMany(Post, { foreignKey: "sellerId", sourceKey: "id" });
  User.hasMany(Post, { foreignKey: "buyerId", sourceKey: "id" });
  User.hasMany(UserAddress, { foreignKey: "userId", sourceKey: "id" });
  User.hasMany(ChatRoom, { foreignKey: "setterId", sourceKey: "id" });
  User.hasMany(ChatRoom, { foreignKey: "getterId", sourceKey: "id" });
  User.hasMany(ChatMessage, { foreignKey: "senderId", sourceKey: "id" });
  User.hasMany(Cog, { foreignKey: "userId", sourceKey: "id" });

  Post.hasMany(ChatRoom, { foreignKey: "postId", sourceKey: "id" });
  Post.hasMany(PostImage, { foreignKey: "postId", sourceKey: "id" });
  Post.belongsTo(User, { foreignKey: "sellerId", targetKey: "id" });
  Post.belongsTo(User, { foreignKey: "buyerId", targetKey: "id" });
  Post.belongsTo(District, { foreignKey: "districtId", targetKey: "id" });

  UserAddress.belongsTo(User, { foreignKey: "userId", targetKey: "id" });
  UserAddress.belongsTo(District, { foreignKey: "districtId", targetKey: "id" });

  PostImage.belongsTo(Post, { foreignKey: "postId", targetKey: "id" });

  ChatRoom.hasMany(ChatMessage, { foreignKey: "roomId", sourceKey: "id" });
  ChatRoom.belongsTo(User, { foreignKey: "setterId", targetKey: "id" });
  ChatRoom.belongsTo(User, { foreignKey: "getterId", targetKey: "id" });
  ChatRoom.belongsTo(Post, { foreignKey: "postId", targetKey: "id" });

  ChatMessage.belongsTo(User, { foreignKey: "senderId", targetKey: "id" });
  ChatMessage.belongsTo(ChatRoom, { foreignKey: "roomId", targetKey: "id" });

  District.hasMany(Post, { foreignKey: "districtId", sourceKey: "id" });
  District.hasMany(UserAddress, { foreignKey: "districtId", sourceKey: "id" });

  Cog.belongsTo(User, { foreignKey: "userId", targetKey: "id" });

  return sequelize;
}
