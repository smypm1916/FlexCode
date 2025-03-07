const oracledb = require("../config/oracledb");

/**
 * order_info 테이블
 * order_no(pk)
 * user_email(fk)
 * total_price
 * order_date
 * order_state
 */

const order_info = {
  tableName: "ORDER_INFO",
  columns: {
    order_no: "ORDER_NO",
    user_email: "USER_EMAIL",
    total_price: "TOTAL_PRICE",
    order_date: "ORDER_DATE",
    order_state: "ORDER_STATE",
  },
};

module.exports = order_info;
