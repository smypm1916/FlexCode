const oracledb = require("../config/oracledb");

/**
 * cart_info 테이블
 * user_email(fk)
 * product_no(fk)
 * product_price
 * option_no(fk)
 * option_price
 * product_quantity
 * cart_date
 */

const cart_info = {
  tableName: "CART_INFO",
  columns: {
    user_email: "USER_EMAIL",
uct_no: "PRODUCT_NO",
    product_price: "PRODUCT_PRICE",
    option_no: "OPTION_NO",
    option_price: "OPTION_PRICE",
    product_quantity: "PRODUCT_QUANTITY",
    cart_date: "CART_DATE",
  },
};

module.exports = cart_info;
