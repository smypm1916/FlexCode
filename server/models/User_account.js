module.exports = (sequelize, DataTypes) => {
  const User_account = sequelize.define(
    "User_account",
    {
      user_email: {
        type: DataTypes.STRING(100),
        primaryKey: true,
        allowNull: false,
        field: "USER_EMAIL",
      },
      user_nickname: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
        field: "USER_NICKNAME",
      },
      user_password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "USER_PASSWORD",
      },
      user_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "USER_NAME",
      },
      user_addr: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "USER_ADDR",
      },
      user_tel: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: "USER_TEL",
      },
      user_profile: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "USER_PROFILE",
      },
    },
    {
      tableName: "USER_ACCOUNT",
      freezeTableName: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return User_account;
};
