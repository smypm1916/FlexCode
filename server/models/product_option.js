const oracledb = require("../config/oracledb");

/**
 * product_option 테이블
 * option_no(pk)
 * product_no(fk)
 * option_title
 * option_price
 * option_state
 */

const product_option = {
  tableName: "PRODUCT_OPTION",
  columns: {
    option_no: "OPTION_NO",
    product_no: "PRODUCT_NO",
    option_title: "OPTION_TITLE",
    option_price: "OPTION_PRICE",
    option_state: "OPTION_STATE",
  },
};

module.exports = product_option;
