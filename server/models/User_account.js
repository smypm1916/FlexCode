module.exports = (sequelize, DataTypes) => {
  const User_account = sequelize.define(
    "USER_ACCOUNT",
    {
      USER_EMAIL: {
        type: DataTypes.STRING(100),
        primaryKey: true,
        allowNull: false,
      },
      USER_NICKNAME: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
      },
      USER_PASSWORD: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      USER_NAME: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      USER_ADDR: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      USER_TEL: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      USER_PROFILE: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
