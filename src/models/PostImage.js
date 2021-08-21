import Sequelize from "sequelize";

export default class PostImage extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        postImagesURL: {
          type: Sequelize.TEXT,
          allowNull: false,
          defaultValue: "https://broombroom.s3.ap-northeast-2.amazonaws.com/broomPost-default.png", // 게시글 기본 이미지
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "PostImage",
        freezeTableName: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
}
