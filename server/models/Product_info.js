module.exports = (sequelize, DataTypes) => {
  const Product_info = sequelize.define(
    "Product_info",
    {
      product_no: {
        type: DataTypes.INTEGER(3),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      product_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      product_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      product_price: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      product_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      product_img: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "product_info",
      /* 인코딩 */
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return Product_info;
};

// const Product_info = sequelize.define(
//   "Product_info",
//   {
//     product_no: {
//       type: DataTypes.INTEGER(3),
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     product_type: {
//       type: DataTypes.STRING(50),
//       allowNull: false,
//     },
//     product_name: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//     },
//     product_price: {
//       type: DataTypes.INTEGER(10),
//       allowNull: false,
//     },
//     product_date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     product_img: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//   },
//   {
//     tableName: "product_info",
//     /* 인코딩 */
//     charset: "utf8",
//     collate: "utf8_general_ci",
//   }
// );

// module.exports = Product_info;
