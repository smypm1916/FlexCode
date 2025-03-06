module.exports = (sequelize, DataTypes) => {
  const Product_info = sequelize.define(
    "Product_info",
    {
      product_no: {
        type: DataTypes.INTEGER(3),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: "PRODUCT_NO",
      },
      product_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "PRODUCT_TYPE",
      },
      product_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "PRODUCT_NAME",
      },
      product_price: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        field: "PRODUCT_PRICE",
      },
      product_date: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "PRODUCT_DATE",
      },
      product_img: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: "PRODUCT_IMG",
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
