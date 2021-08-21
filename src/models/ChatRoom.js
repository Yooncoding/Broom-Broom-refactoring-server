import Sequelize from "sequelize";

export default class ChatRoom extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        lastChat: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "ChatRoom",
        freezeTableName: true,
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
}
