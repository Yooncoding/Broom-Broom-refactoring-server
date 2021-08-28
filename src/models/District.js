import Sequelize from "sequelize";

export default class District extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        ADMCD: {
          // 행정구역코드
          type: Sequelize.BIGINT,
          allowNull: true,
        },
        ADMNM: {
          // 행정구역명
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        SIDONM: {
          // 시도명
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        SGGNM: {
          // 시군구명
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        EMDNM: {
          // 읍면동명
          type: Sequelize.STRING(30),
          allowNull: true,
        },
        simpleName: {
          // 행정지역명 요약
          type: Sequelize.STRING(50),
          allowNull: true,
        },
        X: {
          // EPSG:5179 - x좌표
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        Y: {
          // EPSG:5179 - y좌표
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        geopoint: {
          type: Sequelize.GEOMETRY("POINT", 4326),
          allowNull: true,
        },
        geopolygon: {
          type: Sequelize.GEOMETRY("POLYGON", 4326),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "District",
        freezeTableName: true,
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        indexes: [{ unique: true, fields: ["simpleName", "EMDNM", "ADMNM"] }],
      }
    );
  }
}
