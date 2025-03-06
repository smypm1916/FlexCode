// const User_account = require("./User_account");
// const Product_info = require("./Product_info");
// const Product_option = require("./Product_option");

module.exports = (sequelize, DataTypes) => {
  const Cart_info = sequelize.define(
    "Cart_info",
    {
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
      product_no: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
        // references: {
        //    model: Product_info,
        //    key: "product_no",
        // },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
        // references: {
        //    model: Product_option,
        //    key: "option_no",
        // },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
      cart_date: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "CART_DATE",
      },
    },
    {
      tableName: "CART_INFO",
      freezeTableName: true,
      /* 인코딩 */
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return Cart_info;
};
