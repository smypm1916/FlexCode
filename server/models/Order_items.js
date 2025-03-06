// const Order_info = require("./Order_info");
// const Product_info = require("./Product_info");
// const Product_option = require("./Product_option");

module.exports = (sequelize, DataTypes) => {
  const Order_items = sequelize.define(
    "Order_items",
    {
      order_no: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
        // references: {
        //    model: Order_info,
        //    key: "order_no",
        // },
        field: "ORDER_NO",
      },
      product_no: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
        //   references: {
        //     model: Product_info,
        //     key: "product_no",
        //   },
        field: "PRODUCT_NO",
      },
      product_price: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        field: "PRODUCT_PRICE",
      },
      option_no: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
        //   references: {
        //     model: Product_option,
        //     key: "option_no",
        //   },
        field: "OPTION_NO",
      },
      option_price: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        field: "OPTION_PRICE",
      },
      product_quantity: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
        field: "PRODUCT_QUANTITY",
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
