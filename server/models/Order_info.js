module.exports = (sequelize, DataTypes) => {
  const Order_info = sequelize.define(
    "ORDER_INFO",
    {
      ORDER_NO: {
        type: DataTypes.INTEGER(3),
        primaryKey: true,
        allowNull: false,
      },
      USER_EMAIL: {
        type: DataTypes.STRING(100),
        allowNull: false,
        // references: {
        //    model: User_account,
        //    key: "user_email",
        // },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      TOTAL_PRICE: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      ORDER_DATE: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      ORDER_STATE: {
        type: DataTypes.INTEGER(2),
        allowNull: false,
      },
    },
    {
      tableName: "ORDER_INFO",
      freezeTableName: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return Order_info;
};
