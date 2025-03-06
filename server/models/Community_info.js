// const User_account = require("./User_account");

module.exports = (sequelize, DataTypes) => {
  const Community_info = sequelize.define(
    "Community_info",
    {
      community_no: {
        type: DataTypes.INTEGER(3),
        primaryKey: true,
        allowNull: false,
        field: "COMMUNITY_NO",
      },
      user_nickname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        // references: {
        //    model: User_account,
        //    key: "user_nickname",
        // },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        field: "USER_NICKNAME",
      },
      community_title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "COMMUNITY_TITLE",
      },
      community_content: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "COMMUNITY_CONTENT",
      },
      community_img: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "COMMUNITY_IMG",
      },
      community_date: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "COMMUNITY_DATE",
      },
      community_readcnt: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
        field: "COMMUNITY_READCNT",
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
