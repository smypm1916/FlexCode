module.exports = (sequelize, DataTypes) => {
  const Order_info = sequelize.define(
    "Order_info",
    {
      order_no: {
        type: DataTypes.INTEGER(3),
        primaryKey: true,
        allowNull: false,
        field: "ORDER_NO",
      },
      user_email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        // references: {
        //    model: User_account,
        //    key: "user_email",
        // },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        field: "USER_EMAIL",
      },
      total_price: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        field: "TOTAL_PRICE",
      },
      order_date: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "ORDER_DATE",
      },
      order_state: {
        type: DataTypes.INTEGER(2),
        allowNull: false,
        field: "ORDER_STATE",
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
