const Product_info = require("./Product_info");

module.exports = (sequelize, DataTypes) => {
  const Product_option = sequelize.define(
    "PRODUCT_OPTION",
    {
      OPTION_NO: {
        type: DataTypes.INTEGER(3),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      PRODUCT_NO: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
        references: {
          model: "PRODUCT_INFO",
          key: "PRODUCT_NO",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      OPTION_TITLE: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      OPTION_PRICE: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      OPTION_STATE: {
        type: DataTypes.INTEGER(5),
        allowNull: false,
      },
    },
    {
      tableName: "PRODUCT_OPTION",
      freezeTableName: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return Product_option;
};
