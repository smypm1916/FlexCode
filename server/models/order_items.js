const oracledb = require("../config/oracledb");

/**
 * order_items 테이블
 * order_no(fk)
 * product_no(fk)
 * product_price
 * option_no(fk)
 * option_price
 * product_quantity
 */

const order_items = {
  tableName: "ORDER_ITEMS",
  columns: {
    order_no: "ORDER_NO",
    product_no: "PRODUCT_NO",
    product_price: "PRODUCT_PRICE",
    option_no: "OPTION_NO",
    option_price: "OPTION_PRICE",
    product_quantity: "PRODUCT_QUANTITY",
  },
};

module.exports = order_items;
