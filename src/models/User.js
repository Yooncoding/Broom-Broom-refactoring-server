import Sequelize from "sequelize";
export default class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING(10),
          allowNull: false,
        },
        manners: {
          type: Sequelize.FLOAT,
          allowNull: false,
          defaultValue: 0,
        },
        point: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        profileImageURL: {
          type: Sequelize.STRING(255),
          allowNull: false,
          defaultValue: "https://broombroom.s3.ap-northeast-2.amazonaws.com/broomProfile-default.png", // 프로필 기본 이미지
        },
        role: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        freezeTableName: true,
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
}
