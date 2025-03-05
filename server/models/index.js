const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize");
// const Product_info = require("./Product_info");
// const Product_option = require("./Product_option");
// const Cart_info = require("./Cart_info");
// const User_account = require("./User_account");
// const Order_info = require("./Order_info");
// const Order_items = require("./Order_items");
// const Community_info = require("./Community_info");

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Product_option = require("./Product_option")(sequelize, DataTypes);
db.Product_info = require("./Product_info")(sequelize, DataTypes);
db.Cart_info = require("./Cart_info")(sequelize, DataTypes);
db.User_account = require("./User_account")(sequelize, DataTypes);
db.Order_info = require("./Order_info")(sequelize, DataTypes);
db.Order_items = require("./Order_items")(sequelize, DataTypes);
db.Community_info = require("./Community_info")(sequelize, DataTypes);

// 1. Product_info ↔ Product_option (1:N 관계)
db.Product_option.hasMany(db.Product_info, { foreignKey: "product_no" });
db.Product_info.belongsTo(db.Product_option, { foreignKey: "product_no" });

// 2. User_account ↔ Cart_info (1:N 관계)
db.User_account.hasMany(db.Cart_info, { foreignKey: "user_email" });
db.Cart_info.belongsTo(db.User_account, { foreignKey: "user_email" });

// 3. Cart_info ↔ Product_info (N:M 관계)
db.Cart_info.belongsToMany(db.Product_info, {
   through: "CartProduct",
   foreignKey: "cart_id",
   otherKey: "product_no",
});
db.Product_info.belongsToMany(db.Cart_info, {
   through: "CartProduct",
   foreignKey: "product_no",
   otherKey: "cart_id",
});

// 4. Cart_info ↔ Product_option (N:M 관계)
db.Cart_info.belongsToMany(db.Product_option, {
   through: "CartOption",
   foreignKey: "cart_id",
   otherKey: "option_no",
});
db.Product_option.belongsToMany(db.Cart_info, {
   through: "CartOption",
   foreignKey: "option_no",
   otherKey: "cart_id",
});

// 5. User_account ↔ Order_info (1:N 관계)
db.User_account.hasMany(db.Order_info, { foreignKey: "user_email" });
db.Order_info.belongsTo(db.User_account, { foreignKey: "user_email" });

// 6. Order_info ↔ Order_items (1:N 관계)
db.Order_info.hasMany(db.Order_items, { foreignKey: "order_no" });
db.Order_items.belongsTo(db.Order_info, { foreignKey: "order_no" });

// 7. Order_items ↔ Product_info (N:M 관계)
db.Order_items.belongsToMany(db.Product_info, {
   through: "OrderProduct",
   foreignKey: "order_item_id",
   otherKey: "product_no",
});
db.Product_info.belongsToMany(db.Order_items, {
   through: "OrderProduct",
   foreignKey: "product_no",
   otherKey: "order_item_id",
});

// Order_items ↔ Product_option (N:M 관계)
db.Order_items.belongsToMany(db.Product_option, {
   through: "OrderOption",
   foreignKey: "order_item_id",
   otherKey: "option_no",
});
db.Product_option.belongsToMany(db.Order_items, {
   through: "OrderOption",
   foreignKey: "option_no",
   otherKey: "order_item_id",
});

// User_account ↔ Community_info (1:N 관계)
db.User_account.hasMany(db.Community_info, { foreignKey: "user_nickname" });
db.Community_info.belongsTo(db.User_account, { foreignKey: "user_nickname" });

// module.exports = {
//   sequelize,
//   Product_info,
//   Product_option,
//   Cart_info,
//   User_account,
//   Order_info,
//   Order_items,
//   Community_info,
// };

module.exports = db;
