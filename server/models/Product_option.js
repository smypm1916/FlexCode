const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Product_info = require("./Product_info");

const Product_option = sequelize.define(
  "Product_option",
  {
    option_no: {
      type: DataTypes.INTEGER(3),
      primaryKey: true,
      allowNull: false,
    },
    product_no: {
      type: DataTypes.INTEGER(3),
      allowNull: false,
      references: {
        model: Product_info,
        key: "product_no",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    option_title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    option_price: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
    },
    option_state: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
    },
  },
  {
    tableName: "product_option",
    /* 인코딩 */
    charset: "utf8",
    collate: "utf8_general_ci",
  }
);

module.exports = Product_option;
