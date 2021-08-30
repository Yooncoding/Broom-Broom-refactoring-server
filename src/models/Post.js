import Sequelize from "sequelize";

export default class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        status: {
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: "basic", // start, end, stop, close
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        deadline: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        review: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Post",
        freezeTableName: true,
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        indexes: [{ fields: ["title"] }],
      }
    );
  }
}
