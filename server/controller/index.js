const { sequelize } = require("../config/sequelize");
const Product_info = require("../models/Product_info");
const Product_option = require("../models/Product_option");
const Cart_info = require("../models/Cart_info");
const User_account = require("../models/User_account");
const Order_info = require("../models/Order_info");
const Order_items = require("../models/Order_items");
const Community_info = require("../models/Community_info");

// 1. Product_info ↔ Product_option (1:N 관계)
Product_option.hasMany(Product_info, { foreignKey: "product_no" });
Product_info.belongsTo(Product_option, { foreignKey: "product_no" });

// 2. User_account ↔ Cart_info (1:N 관계)
User_account.hasMany(Cart_info, { foreignKey: "user_email" });
Cart_info.belongsTo(User_account, { foreignKey: "user_email" });

// 3. Cart_info ↔ Product_info (N:M 관계)
Cart_info.belongsToMany(Product_info, {
  through: "CartProduct",
  foreignKey: "cart_id",
  otherKey: "product_no",
});
Product_info.belongsToMany(Cart_info, {
  through: "CartProduct",
  foreignKey: "product_no",
  otherKey: "cart_id",
});

// 4. Cart_info ↔ Product_option (N:M 관계)
Cart_info.belongsToMany(Product_option, {
  through: "CartOption",
  foreignKey: "cart_id",
  otherKey: "option_no",
});
Product_option.belongsToMany(Cart_info, {
  through: "CartOption",
  foreignKey: "option_no",
  otherKey: "cart_id",
});

// 5. User_account ↔ Order_info (1:N 관계)
User_account.hasMany(Order_info, { foreignKey: "user_email" });
Order_info.belongsTo(User_account, { foreignKey: "user_email" });

// 6. Order_info ↔ Order_items (1:N 관계)
Order_info.hasMany(Order_items, { foreignKey: "order_no" });
Order_items.belongsTo(Order_info, { foreignKey: "order_no" });

// 7. Order_items ↔ Product_info (N:M 관계)
Order_items.belongsToMany(Product_info, {
  through: "OrderProduct",
  foreignKey: "order_item_id",
  otherKey: "product_no",
});
Product_info.belongsToMany(Order_items, {
  through: "OrderProduct",
  foreignKey: "product_no",
  otherKey: "order_item_id",
});

// Order_items ↔ Product_option (N:M 관계)
Order_items.belongsToMany(Product_option, {
  through: "OrderOption",
  foreignKey: "order_item_id",
  otherKey: "option_no",
});
Product_option.belongsToMany(Order_items, {
  through: "OrderOption",
  foreignKey: "option_no",
  otherKey: "order_item_id",
});

// User_account ↔ Community_info (1:N 관계)
User_account.hasMany(Community_info, { foreignKey: "user_nickname" });
Community_info.belongsTo(User_account, { foreignKey: "user_nickname" });

module.exports = {
  sequelize,
  Product_info,
  Product_option,
  Cart_info,
  User_account,
  Order_info,
  Order_items,
  Community_info,
};
