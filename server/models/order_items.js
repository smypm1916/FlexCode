const oracledb = require("../config/oracledb");

/**
 * order_items 테이블
 * order_no(fk) : number(3)
 * product_no(fk) : number(3)
 * product_price : number(10)
 * option_no(fk) : number(13)
 * option_price : number(10)
 * product_quantity : number(3)
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
