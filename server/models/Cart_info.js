// const User_account = require("./User_account");
// const Product_info = require("./Product_info");
// const Product_option = require("./Product_option");

module.exports = (sequelize, DataTypes) => {
  const Cart_info = sequelize.define(
    "CART_INFO",
    {
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
      PRODUCT_NO: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
        // references: {
        //    model: Product_info,
        //    key: "product_no",
        // },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      PRODUCT_PRICE: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      OPTION_NO: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
        // references: {
        //    model: Product_option,
        //    key: "option_no",
        // },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      OPTION_PRICE: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      PRODUCT_QUANTITY: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
      },
      CART_DATE: {
        type: DataTypes.DATE,
        allowNull: false,
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
