module.exports = (sequelize, DataTypes) => {
  const Community_info = sequelize.define(
    "Community_info",
    {
      community_no: {
        type: DataTypes.INTEGER(3),
        primaryKey: true,
        allowNull: false,
      },
      user_nickname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        // references: {
        //    model: User_account,
        //    key: "user_nickname",
        // },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      community_title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      community_content: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      community_img: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      community_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      community_readcnt: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
      },
    },
    {
      tableName: "community_info",
      /* 인코딩 */
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  return Community_info;
};

// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/sequelize");
// const User_account = require("./User_account");

// const Community_info = sequelize.define(
//   "Community_info",
//   {
//     community_no: {
//       type: DataTypes.INTEGER(3),
//       primaryKey: true,
//       allowNull: false,
//     },
//     user_nickname: {
//       type: DataTypes.STRING(50),
//       allowNull: false,
//       references: {
//         model: User_account,
//         key: "user_nickname",
//       },
//       onDelete: "CASCADE",
//       onUpdate: "CASCADE",
//     },
//     community_title: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//     },
//     community_content: {
//       type: DataTypes.STRING(255),
//       allowNull: false,
//     },
//     community_img: {
//       type: DataTypes.STRING(255),
//       allowNull: true,
//     },
//     community_date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     community_readcnt: {
//       type: DataTypes.INTEGER(3),
//       allowNull: false,
//     },
//   },
//   {
//     tableName: "community_info",
//     /* 인코딩 */
//     charset: "utf8",
//     collate: "utf8_general_ci",
//   }
// );

// module.exports = Community_info;
