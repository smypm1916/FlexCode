module.exports = (sequelize, DataTypes) => {
   const User_account = sequelize.define(
      "User_account",
      {
         user_email: {
            type: DataTypes.STRING(100),
            primaryKey: true,
            allowNull: false,
         },
         user_nickname: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
         },
         user_password: {
            type: DataTypes.STRING(255),
            allowNull: false,
         },
         user_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
         },
         user_addr: {
            type: DataTypes.STRING(255),
            allowNull: false,
         },
         user_tel: {
            type: DataTypes.STRING(20),
            allowNull: false,
         },
         user_profile: {
            type: DataTypes.STRING(255),
            allowNull: false,
         },
      },
      {
         tableName: "user_account",
         /* 인코딩 */
         charset: "utf8",
         collate: "utf8_general_ci",
      }
   );
   return User_account;
};

// const User_account = sequelize.define(
//   "User_account",
//   {
//     user_email: {
//       type: DataTypes.STRING(100),
//       primaryKey: true,
//       allowNull: false,
//     },
//     user_nickname: {
//       type: DataTypes.STRING(50),
//       unique: true,
//       allowNull: false,
//     },
//     user_password: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     user_name: {
//       type: DataTypes.STRING(50),
//       allowNull: false,
//     },
//     user_addr: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     user_tel: {
//       type: DataTypes.STRING(20),
//       allowNull: false,
//     },
//     user_profile: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "user_account",
//     /* 인코딩 */
//     charset: "utf8",
//     collate: "utf8_general_ci",
//   }
// );

// module.exports = User_account;
