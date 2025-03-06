// const User_account = require("./User_account");

module.exports = (sequelize, DataTypes) => {
   const Order_info = sequelize.define("Order_info",
      {
         order_no: {
            type: DataTypes.INTEGER(3),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         user_email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            // references: {
            //    model: User_account,
            //    key: "user_email",
            // },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
         },
         total_price: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
         },
         order_date: {
            type: DataTypes.DATE,
            allowNull: false,
         },
         order_state: {
            type: DataTypes.INTEGER(2),
            allowNull: false,
         },
      },
      {
         tableName: "order_info",
         /* 인코딩 */
         charset: "utf8",
         collate: "utf8_general_ci",
      }
   );
   return Order_info;
};
// const Order_info = sequelize.define(
//   "Order_info",
//   {
//     order_no: {
//       type: DataTypes.INTEGER(3),
//       primaryKey: true,
//       allowNull: false,
//     },
//     user_email: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//       references: {
//         model: User_account,
//         key: "user_email",
//       },
//       onDelete: "CASCADE",
//       onUpdate: "CASCADE",
//     },
//     total_price: {
//       type: DataTypes.INTEGER(10),
//       allowNull: false,
//     },
//     order_date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     order_state: {
//       type: DataTypes.INTEGER(2),
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "order_info",
//     /* 인코딩 */
//     charset: "utf8",
//     collate: "utf8_general_ci",
//   }
// );

// module.exports = Order_info;
