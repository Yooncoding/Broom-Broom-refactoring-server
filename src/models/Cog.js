import Sequelize from "sequelize";

export default class Cog extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        type: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        bankAccount: {
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        bankName: {
          type: Sequelize.STRING(10),
          allowNull: true,
        },
        amount: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        status: {
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: "basic", // hold
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Cog",
        freezeTableName: true,
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
}
