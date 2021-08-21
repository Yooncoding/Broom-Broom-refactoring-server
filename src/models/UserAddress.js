import Sequelize from "sequelize";

export default class UserAddress extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        scope: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        nearDistricts: {
          type: Sequelize.TEXT,
          allowNull: false,
          defaultValue: "826",
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "UserAddress",
        freezeTableName: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        hooks: {
          afterCreate: (userAddress) => {
            userAddress.districtId = 826;
          },
        },
      }
    );
  }
}
