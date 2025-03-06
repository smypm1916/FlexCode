// const User_account = require("./User_account");

module.exports = (sequelize, DataTypes) => {
  const Community_info = sequelize.define(
    "COMMUNITY_INFO",
    {
      COMMUNITY_NO: {
        type: DataTypes.INTEGER(3),
        primaryKey: true,
        allowNull: false,
      },
      USER_NICKNAME: {
        type: DataTypes.STRING(50),
        allowNull: false,
        // references: {
        //    model: User_account,
        //    key: "user_nickname",
        // },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      COMMUNITY_TITLE: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      COMMUNITY_CONTENT: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      COMMUNITY_IMG: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      COMMUNITY_DATE: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      COMMUNITY_READCNT: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
      },
    },
    {
      tableName: "COMMUNITY_INFO",
      freezeTableName: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return Community_info;
};
