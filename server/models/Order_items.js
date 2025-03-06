// const Order_info = require("./Order_info");
// const Product_info = require("./Product_info");
// const Product_option = require("./Product_option");

module.exports = (sequelize, DataTypes) => {
  const Order_items = sequelize.define(
    "ORDER_ITEMS",
    {
      ORDER_NO: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
        // references: {
        //    model: Order_info,
        //    key: "order_no",
        // },
      },
      PRODUCT_NO: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
        //   references: {
        //     model: Product_info,
        //     key: "product_no",
        //   },
      },
      PRODUCT_PRICE: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      OPTION_NO: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
        //   references: {
        //     model: Product_option,
        //     key: "option_no",
        //   },
      },
      OPTION_PRICE: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      PRODUCT_QUANTITY: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
      },
    },
    {
      tableName: "ORDER_ITEMS",
      freezeTableName: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return Order_items;
};
