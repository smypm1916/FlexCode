module.exports = (sequelize, DataTypes) => {
  const Product_info = sequelize.define(
    "PRODUCT_INFO",
    {
      PRODUCT_NO: {
        type: DataTypes.INTEGER(3),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      PRODUCT_TYPE: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      PRODUCT_NAME: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      PRODUCT_PRICE: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      PRODUCT_DATE: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      PRODUCT_IMG: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "PRODUCT_INFO",
      freezeTableName: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return Product_info;
};
