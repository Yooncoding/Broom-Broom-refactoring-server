import Sequelize from "sequelize";

export default class Session extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        sid: {
          type: Sequelize.STRING,
          primaryKey: true,
        },
        expires: {
          type: Sequelize.DATE,
        },
        data: {
          type: Sequelize.TEXT,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Session",
        freezeTableName: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        indexes: [
          {
            name: "session_sid_index",
            method: "BTREE",
            fields: ["sid"],
          },
        ],
      }
    );
  }
}
