const Order_info = require("./Order_info");
const Product_info = require("./Product_info");
const Product_option = require("./Product_option");

module.exports = (sequelize, DataTypes) => {
   const Order_items = sequelize.define(
      "Order_items",
      {
         order_no: {
            type: DataTypes.INTEGER(3),
            allowNull: false,
            references: {
               model: Order_info,
               key: "order_no",
            },
         },
         product_no: {
            type: DataTypes.INTEGER(3),
            allowNull: false,
            references: {
               model: Product_info,
               key: "product_no",
            },
         },
         product_price: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
         },
         option_no: {
            type: DataTypes.INTEGER(3),
            allowNull: false,
            references: {
               model: Product_option,
               key: "option_no",
            },
         },
         option_price: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
         },
         product_quantity: {
            type: DataTypes.INTEGER(3),
            allowNull: false,
         },
      },
      {
         tableName: "order_items",
         /* 인코딩 */
         charset: "utf8",
         collate: "utf8_general_ci",
      }
   );
};


// const Order_items = sequelize.define(
//   "Order_items",
//   {
//     order_no: {
//       type: DataTypes.INTEGER(3),
//       allowNull: false,
//       references: {
//         model: Order_info,
//         key: "order_no",
//       },
//     },
//     product_no: {
//       type: DataTypes.INTEGER(3),
//       allowNull: false,
//       references: {
//         model: Product_info,
//         key: "product_no",
//       },
//     },
//     product_price: {
//       type: DataTypes.INTEGER(10),
//       allowNull: false,
//     },
//     option_no: {
//       type: DataTypes.INTEGER(3),
//       allowNull: false,
//       references: {
//         model: Product_option,
//         key: "option_no",
//       },
//     },
//     option_price: {
//       type: DataTypes.INTEGER(10),
//       allowNull: false,
//     },
//     product_quantity: {
//       type: DataTypes.INTEGER(3),
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "order_items",
//     /* 인코딩 */
//     charset: "utf8",
//     collate: "utf8_general_ci",
//   }
// );

// module.exports = Order_items;
