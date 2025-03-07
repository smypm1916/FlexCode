const oracledb = require("../config/oracledb");

/**
 * product_info 테이블
 * product_no(pk)
 * product_type
 * product_name
 * product_price
 * product_date
 * product_img
 */

const product_info = {
  tableName: "PRODUCT_INFO",
  columns: {
    product_no: "PRODUCT_NO",
    product_type: "PRODUCT_TYPE",
    product_name: "PRODUCT_NAME",
    product_price: "PRODUCT_PRICE",
    product_date: "PRODUCT_DATE",
    product_img: "PRODUCT_IMG",
  },
};

module.exports = product_info;
