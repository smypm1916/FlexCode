const Product_info = require("./Product_info");

module.exports = (sequelize, DataTypes) => {
  const Product_option = sequelize.define(
    "Product_option",
    {
      option_no: {
        type: DataTypes.INTEGER(3),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      product_no: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
        references: {
          model: "PRODUCT_INFO",
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
      tableName: "PRODUCT_OPTION",
      /* 인코딩 */
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return Product_option;
};

// const Product_option = sequelize.define(
//   "Product_option",
//   {
//     option_no: {
//       type: DataTypes.INTEGER(3),
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     product_no: {
//       type: DataTypes.INTEGER(3),
//       allowNull: false,
//       references: {
//         model: Product_info,
//         key: "product_no",
//       },
//       onDelete: "CASCADE",
//       onUpdate: "CASCADE",
//     },
//     option_title: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//     },
//     option_price: {
//       type: DataTypes.INTEGER(10),
//       allowNull: false,
//     },
//     option_state: {
//       type: DataTypes.INTEGER(5),
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "product_option",
//     /* 인코딩 */
//     charset: "utf8",
//     collate: "utf8_general_ci",
//   }
// );

// module.exports = Product_option;

